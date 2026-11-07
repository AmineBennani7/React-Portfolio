import { archive } from "../../data/profile";
import styles from "./Archive.module.css";

export function Archive() {
  return (
    <section id="archive" className={styles.section} aria-labelledby="archive-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <h2 id="archive-title" className={styles.title}>
            Earlier projects
          </h2>
          <p className={styles.note}>Smaller university and personal projects.</p>
        </div>

        <ul className={styles.list}>
          {archive.map((a) => (
            <li key={a.href} className={styles.row} data-reveal>
              <a href={a.href} target="_blank" rel="noreferrer" className={styles.link}>
                <span className={styles.year}>{a.year}</span>
                <span className={styles.name}>{a.title}</span>
                <span className={styles.desc}>{a.note}</span>
                <span className={styles.stack}>{a.stack}</span>
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>
                <span className="visually-hidden"> (GitHub, opens in a new tab)</span>
              </a>
              {a.doc && (
                <a href={a.doc.href} target="_blank" rel="noreferrer" className={styles.doc}>
                  {a.doc.label} <span aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
