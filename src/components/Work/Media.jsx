import { Picture } from "../ui/Picture";
import { ClairDiagram, CouncilDiagram } from "./Diagrams";
import styles from "./Media.module.css";

const diagrams = { council: CouncilDiagram, clair: ClairDiagram };

/**
 * Project visual: a real image or a conceptual diagram, always labelled with what it is.
 */
export function Media({ media, sizes, fit = "contain", ratio, className = "", eager = false, showCaption = true }) {
  const Diagram = media.diagram ? diagrams[media.diagram] : null;
  return (
    <figure className={`${styles.media} ${className}`}>
      <div
        className={`${styles.frame} ${styles[fit]} ${Diagram ? styles.isDiagram : ""}`}
        style={ratio || media.ratio ? { aspectRatio: ratio || media.ratio } : undefined}
      >
        {Diagram ? (
          <Diagram />
        ) : (
          <Picture image={media.image} alt={media.caption} sizes={sizes} className={styles.img} eager={eager} />
        )}
        <span className={styles.kind}>{media.kind}</span>
      </div>
      {showCaption && <figcaption className={styles.caption}>{media.caption}</figcaption>}
    </figure>
  );
}
