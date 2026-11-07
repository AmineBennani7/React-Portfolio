import manifest from "../data/images.json";

// Every responsive variant generated into src/assets/work, resolved by Vite to hashed URLs.
const files = import.meta.glob("../assets/work/**/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

const urlFor = (rel) => files[`../assets/work/${rel}`];

/** Returns { src, srcSet, width, height } for an image key such as "gps/map". */
export function getImage(key) {
  const entry = manifest[key];
  if (!entry) throw new Error(`Unknown image key: ${key}`);
  const sources = entry.sources.map(([w, rel]) => [w, urlFor(rel)]);
  const largest = sources[sources.length - 1];
  return {
    src: sources.length > 1 ? sources[1][1] : largest[1],
    srcSet: sources.map(([w, url]) => `${url} ${w}w`).join(", "),
    width: entry.w,
    height: entry.h,
  };
}
