import { Media } from "./Media";
import styles from "./ProjectFeature.module.css";

export function ProjectFeature({ project: p, flip, onOpen }) {
  return (
    <li className={`${styles.item} ${flip ? styles.flip : ""}`} data-reveal>
      <article className={styles.grid} aria-labelledby={`p-${p.slug}`}>
        <div className={styles.media}>
          <button
            type="button"
            className={styles.mediaButton}
            onClick={() => onOpen(p.slug)}
            aria-label={`Open the ${p.title} case study`}
            tabIndex={-1}
          >
            <Media
              media={p.cover}
              fit={p.cover.fit || "contain"}
              sizes="(min-width: 1024px) 58vw, 100vw"
              showCaption={false}
            />
            <span className={styles.hoverCue} aria-hidden="true">
              Case study <span>→</span>
            </span>
          </button>
          <p className={styles.caption}>
            {p.cover.caption}
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.topline}>
            <span className={styles.discipline}>{p.discipline}</span>
            <span className={styles.year}>{p.year}</span>
          </div>

          <h3 id={`p-${p.slug}`} className={styles.title}>
            {p.title}
          </h3>
          <p className={styles.headline}>{p.headline}</p>
          <p className={styles.summary}>{p.summary}</p>

          <p className={`${styles.status} ${styles[p.status.tone]}`}>
            <span className={styles.statusDot} aria-hidden="true" />
            {p.status.label}
          </p>

          <ul className={styles.tags} aria-label="Technologies">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button type="button" className={styles.primary} onClick={() => onOpen(p.slug)}>
              Read case study
              <span aria-hidden="true">→</span>
            </button>
            <a className={styles.secondary} href={p.repo} target="_blank" rel="noreferrer">
              GitHub
              <span aria-hidden="true">↗</span>
              <span className="visually-hidden"> repository for {p.title} (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </article>
    </li>
  );
}
