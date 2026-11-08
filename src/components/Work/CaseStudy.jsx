import { useEffect, useRef } from "react";
import { useLang } from "../../i18n/context";
import { Media } from "./Media";
import { Pipeline } from "./Pipeline";
import { TrajectoryField } from "./TrajectoryField";
import styles from "./CaseStudy.module.css";

/**
 * Case study in a native modal <dialog>: focus is trapped and Escape closes it.
 */
export function CaseStudy({ project, onClose }) {
  const { t } = useLang();
  const c = t.caseStudy;
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
              <span className={styles.crumb}>{c.crumb}</span>
              <button type="button" className={styles.close} onClick={() => ref.current.close()}>
                {c.close} <span aria-hidden="true">✕</span>
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
                <dt>{c.status}</dt>
                <dd>{p.status.label}</dd>
              </div>
            </dl>

            <div className={styles.links}>
              {p.repoPrivate ? (
                <span className={styles.note}>{c.privateNote}</span>
              ) : (
                <a href={p.repo} target="_blank" rel="noreferrer" className={styles.repo}>
                  {c.viewRepo} <span aria-hidden="true">↗</span>
                </a>
              )}
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

          <Block title={c.problem}>
            <p className={styles.lead}>{cs.problem}</p>
          </Block>

          <Block title={c.architecture}>
            <Pipeline steps={cs.architecture} label={c.stages(p.title)} />
          </Block>

          <Block title={c.implementation}>
            <ul className={styles.bullets}>
              {cs.implementation.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Block>

          <Block title={c.tools}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">{c.component}</th>
                  <th scope="col">{c.builtWith}</th>
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

          <Block title={c.results}>
            <ul className={`${styles.bullets} ${styles.results}`}>
              {cs.results.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {cs.resultsNote && <p className={styles.note}>{cs.resultsNote}</p>}
          </Block>

          <Block title={c.limitations}>
            <ul className={`${styles.bullets} ${styles.limits}`}>
              {cs.limitations.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Block>

          {cs.gallery.length > 0 && (
            <Block title={c.evidence}>
              <div className={styles.gallery}>
                {cs.gallery.map((g) => (
                  <Media key={g.image} media={g} sizes="(min-width: 1100px) 500px, 100vw" />
                ))}
              </div>
            </Block>
          )}

          <footer className={styles.footer}>
            {p.repoPrivate ? (
              <span />
            ) : (
              <a href={p.repo} target="_blank" rel="noreferrer" className={styles.repo}>
                {c.readFull} <span aria-hidden="true">↗</span>
              </a>
            )}
            <button type="button" className={styles.close} onClick={() => ref.current.close()}>
              {c.back}
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
