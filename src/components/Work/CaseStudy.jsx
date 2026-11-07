import { useEffect, useRef } from "react";
import { Media } from "./Media";
import { Pipeline } from "./Pipeline";
import { TrajectoryField } from "./TrajectoryField";
import styles from "./CaseStudy.module.css";

/**
 * Case study in a native modal <dialog>: focus is trapped and Escape closes it.
 */
export function CaseStudy({ project, onClose }) {
  const ref = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      lastFocus.current = document.activeElement;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add("is-locked");
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  useEffect(() => {
    const dialog = ref.current;
    const onDialogClose = () => {
      document.body.classList.remove("is-locked");
      onClose();
      if (lastFocus.current && document.contains(lastFocus.current)) lastFocus.current.focus();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => dialog.removeEventListener("close", onDialogClose);
  }, [onClose]);

  const onBackdrop = (e) => {
    if (e.target === ref.current) ref.current.close();
  };

  const p = project;
  const cs = p?.caseStudy;

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby={p ? `cs-${p.slug}` : undefined}
      onClick={onBackdrop}
    >
      {p && (
        <article className={styles.sheet}>
          <header className={styles.header}>
            <div className={styles.headerBar}>
              <span className={styles.crumb}>Case study</span>
              <button type="button" className={styles.close} onClick={() => ref.current.close()}>
                Close <span aria-hidden="true">✕</span>
              </button>
            </div>
            <p className={styles.discipline}>{p.discipline}</p>
            <h2 id={`cs-${p.slug}`} className={styles.title}>
              {p.title}
            </h2>
            <p className={styles.headline}>{p.headline}</p>

            <dl className={styles.facts}>
              {p.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              <div>
                <dt>Status</dt>
                <dd>{p.status.label}</dd>
              </div>
            </dl>

            <div className={styles.links}>
              <a href={p.repo} target="_blank" rel="noreferrer" className={styles.repo}>
                View repository on GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </header>

          <Media
            media={p.cover}
            fit={p.cover.fit || "contain"}
            sizes="(min-width: 1100px) 1000px, 100vw"
            className={styles.cover}
            eager
          />

          {cs.replay && (
            <div className={styles.replay}>
              <TrajectoryField />
            </div>
          )}

          <Block title="Problem">
            <p className={styles.lead}>{cs.problem}</p>
          </Block>

          <Block title="Architecture">
            <Pipeline steps={cs.architecture} label={`${p.title} architecture stages`} />
          </Block>

          <Block title="Implementation">
            <ul className={styles.bullets}>
              {cs.implementation.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Block>

          <Block title="Tools and components">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">Built with</th>
                </tr>
              </thead>
              <tbody>
                {cs.ownership.map(([part, by]) => (
                  <tr key={part}>
                    <td>{part}</td>
                    <td>{by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Block>

          <Block title="Results">
            <ul className={`${styles.bullets} ${styles.results}`}>
              {cs.results.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {cs.resultsNote && <p className={styles.note}>{cs.resultsNote}</p>}
          </Block>

          <Block title="Limitations">
            <ul className={`${styles.bullets} ${styles.limits}`}>
              {cs.limitations.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Block>

          {cs.gallery.length > 0 && (
            <Block title="Evidence">
              <div className={styles.gallery}>
                {cs.gallery.map((g) => (
                  <Media key={g.image} media={g} sizes="(min-width: 1100px) 500px, 100vw" />
                ))}
              </div>
            </Block>
          )}

          <footer className={styles.footer}>
            <a href={p.repo} target="_blank" rel="noreferrer" className={styles.repo}>
              Read the full README and code <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className={styles.close} onClick={() => ref.current.close()}>
              Back to work
            </button>
          </footer>
        </article>
      )}
    </dialog>
  );
}

function Block({ title, children }) {
  return (
    <section className={styles.block}>
      <h3 className={styles.blockTitle}>
        {title}
      </h3>
      <div className={styles.blockBody}>{children}</div>
    </section>
  );
}
