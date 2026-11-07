import { Media } from "./Media";
import styles from "./FeaturedCard.module.css";

export function FeaturedCard({ project: p, onOpen }) {
  const hasCase = Boolean(p.caseStudy);
  const cover = p.cardCover || p.cover;
  return (
    <li id={`project-${p.slug}`} className={styles.card} data-reveal>
      <article aria-labelledby={`p-${p.slug}`} className={styles.inner}>
        {p.cardText ? (
          <button
            type="button"
            className={styles.textCard}
            onClick={() => onOpen(p.slug)}
            aria-label={`Open the ${p.title} case study`}
            tabIndex={-1}
          >
            <span className={styles.textSteps}>
              {p.cardText.map((step, k) => (
                <span key={step}>
                  {step}
                  {k < p.cardText.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
                </span>
              ))}
            </span>
          </button>
        ) : hasCase ? (
          <button
            type="button"
            className={styles.mediaButton}
            onClick={() => onOpen(p.slug)}
            aria-label={`Open the ${p.title} case study`}
            tabIndex={-1}
          >
            <Media media={cover} fit={cover.fit || "contain"} ratio="16 / 10" sizes="(min-width: 900px) 46vw, 100vw" showCaption={false} />
          </button>
        ) : (
          <Media media={cover} fit={cover.fit || "contain"} ratio="16 / 10" sizes="(min-width: 900px) 46vw, 100vw" showCaption={false} />
        )}

        {cover.credit && (
          <p className={styles.credit}>
            <a href={cover.credit.href} target="_blank" rel="noreferrer">
              {cover.credit.text}
            </a>
          </p>
        )}

        <div className={styles.body}>
          <p className={styles.meta}>
            <span>{p.discipline}</span>
            <span>{p.year}</span>
          </p>
          <h3 id={`p-${p.slug}`} className={styles.title}>
            {p.title}
          </h3>
          <p className={styles.summary}>{p.summary}</p>
          {p.stats && (
            <ul className={styles.figures} aria-label="Results">
              {p.stats.map(([value, label]) => (
                <li key={label}>
                  <strong>{value}</strong> {label}
                </li>
              ))}
            </ul>
          )}
          {p.status && p.status.tone !== "done" && (
            <p className={`${styles.status} ${styles[p.status.tone]}`}>{p.status.label}</p>
          )}
          <ul className={styles.tags} aria-label="Technologies">
            {p.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            {hasCase && (
              <button type="button" className={styles.primary} onClick={() => onOpen(p.slug)}>
                Case study <span aria-hidden="true">→</span>
              </button>
            )}
            {p.repo && p.repoPrivate && <span className={styles.private}>Private repository</span>}
            {p.repo && !p.repoPrivate && (
              <a className={styles.secondary} href={p.repo} target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
                <span className="visually-hidden"> repository for {p.title} (opens in a new tab)</span>
              </a>
            )}
            {(p.links || []).map((l) => (
              <a
                key={l.href}
                className={styles.secondary}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {l.label} {l.external && <span aria-hidden="true">↗</span>}
              </a>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}
