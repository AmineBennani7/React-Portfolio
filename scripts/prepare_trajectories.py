"""Build the hero trajectory dataset from the GPS Trajectory Analysis project.

Source: data/fleet_gps_seville.csv and data/zones_seville.geojson from
https://github.com/AmineBennani7/gps-trajectory-analysis-seville (synthetic data).

The hero only needs a light, pre-cleaned version, so this script applies a
simplified subset of that project's cleaning rules (bounding box, accuracy,
duplicate timestamps, 200 km/h jump filter), projects to a local metric
plane, rounds to metres and keeps every second fix.

Usage:
    python scripts/prepare_trajectories.py fleet_gps_seville.csv zones_seville.geojson
Writes src/data/trajectories.json
"""

import csv
import json
import math
import sys
from collections import defaultdict
from datetime import datetime
from pathlib import Path

BBOX = (37.30, 37.45, -6.08, -5.88)  # lat_min, lat_max, lon_min, lon_max
MAX_ACCURACY_M = 30.0
MAX_SPEED_KMH = 200.0
LAT0, LON0 = 37.388, -5.985  # local origin near the centre of Seville
M_PER_DEG_LAT = 111_320.0
M_PER_DEG_LON = 111_320.0 * math.cos(math.radians(LAT0))


def to_xy(lat, lon):
    return ((lon - LON0) * M_PER_DEG_LON, (LAT0 - lat) * M_PER_DEG_LAT)


def main(csv_path, zones_path):
    tracks = defaultdict(list)
    low_accuracy = []
    for row in csv.DictReader(open(csv_path, encoding="utf-8")):
        try:
            ts = datetime.fromisoformat(row["timestamp"])
            lat, lon = float(row["latitude"]), float(row["longitude"])
        except (ValueError, TypeError):
            continue
        if not (BBOX[0] <= lat <= BBOX[1] and BBOX[2] <= lon <= BBOX[3]):
            continue
        acc = float(row["accuracy_m"] or 0)
        x, y = to_xy(lat, lon)
        if acc > MAX_ACCURACY_M:
            low_accuracy.append([round(x), round(y)])
            continue
        tracks[(row["vehicle_id"], ts.date().isoformat())].append((ts, x, y))

    out = []
    for (vehicle, day), pts in sorted(tracks.items()):
        pts.sort()
        clean, last_ts = [], None
        for ts, x, y in pts:
            if ts == last_ts:
                continue
            if clean:
                pts_prev = clean[-1]
                dt = (ts - pts_prev[0]).total_seconds()
                dist = math.hypot(x - pts_prev[1], y - pts_prev[2])
                if dt > 0 and dist / dt * 3.6 > MAX_SPEED_KMH:
                    continue
            clean.append((ts, x, y))
            last_ts = ts
        t0 = clean[0][0]
        coords = [
            [round(x), round(y), int((ts - t0).total_seconds())]
            for i, (ts, x, y) in enumerate(clean)
            if i % 2 == 0 or i == len(clean) - 1
        ]
        out.append({"id": f"{vehicle}_{day}", "vehicle": vehicle, "day": day, "points": coords})

    zones = []
    for f in json.load(open(zones_path, encoding="utf-8"))["features"]:
        ring = f["geometry"]["coordinates"][0]
        zones.append({
            "name": f["properties"].get("name") or f["properties"].get("zone_id"),
            "ring": [[round(v) for v in to_xy(lat, lon)] for lon, lat in ring],
        })

    data = {
        "source": "Synthetic fleet data, GPS Trajectory Analysis (Seville)",
        "units": "metres, local plane",
        "trajectories": out,
        "lowAccuracy": low_accuracy,
        "zones": zones,
    }
    target = Path(__file__).resolve().parents[1] / "src" / "data" / "trajectories.json"
    target.write_text(json.dumps(data, separators=(",", ":")))
    print(target, sum(len(t["points"]) for t in out), "points,", len(zones), "zones")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
