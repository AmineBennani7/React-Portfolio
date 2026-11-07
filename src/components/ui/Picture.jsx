import { getImage } from "../../lib/images";

/**
 * Responsive, lazy-loaded WebP image with intrinsic dimensions (no layout shift).
 */
export function Picture({ image, alt, sizes = "100vw", className, eager = false }) {
  const { src, srcSet, width, height } = getImage(image);
  return (
    <img
      className={className}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
    />
  );
}
