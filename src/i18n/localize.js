const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

/**
 * Overlays a translation onto the English source data.
 * Objects merge key by key and arrays merge index by index, so a translation
 * file only has to mirror the parts that contain text.
 */
export function deepMerge(base, overlay) {
  if (overlay === undefined || overlay === null) return base;
  if (Array.isArray(base) && Array.isArray(overlay)) {
    return base.map((item, i) => (i < overlay.length ? deepMerge(item, overlay[i]) : item));
  }
  if (isObject(base) && isObject(overlay)) {
    const out = { ...base };
    for (const key of Object.keys(overlay)) out[key] = deepMerge(base[key], overlay[key]);
    return out;
  }
  return overlay;
}
