import styles from "./OtherProjects.module.css";

/**
 * Compact list: projects with a case study open it; the rest link to GitHub.
 */
export function OtherProjects({ items, onOpen }) {
  if (items.length === 0) return null;
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title} data-reveal>
        Other projects
      </h3>
      <ul className={styles.list}>
        {items.map((a) => (
          <li key={a.href} className={styles.row} data-reveal>
            <span className={styles.year}>{a.year}</span>
            <span className={styles.name}>{a.title}</span>
            <span className={styles.desc}>{a.note}</span>
            <span className={styles.stack}>{a.stack}</span>
            <span className={styles.actions}>
              {a.slug && (
                <button type="button" className={styles.action} onClick={() => onOpen(a.slug)}>
                  Case study
                </button>
              )}
              {a.repoPrivate ? (
                <span className={styles.private}>Private repo</span>
              ) : (
                <a href={a.href} target="_blank" rel="noreferrer" className={styles.action}>
                  GitHub <span aria-hidden="true">↗</span>
                  <span className="visually-hidden"> repository for {a.title} (opens in a new tab)</span>
                </a>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
