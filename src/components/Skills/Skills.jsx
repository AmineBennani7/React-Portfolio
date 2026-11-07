import { expertise } from "../../data/profile";
import { SectionHead } from "../ui/SectionHead";
import styles from "./Skills.module.css";

export function Skills() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title="Skills" />
        <div className={styles.domains}>
          {expertise.map((d) => (
            <article key={d.domain} className={styles.domain} data-reveal>
              <h3 className={styles.domainName}>{d.domain}</h3>
              <ul className={styles.stack}>
                {d.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className={styles.evidence}>
                <span>Used in</span>
                {d.evidence.map((ev, k) => (
                  <span key={ev.label}>
                    <a href={ev.href}>{ev.label}</a>
                    {k < d.evidence.length - 1 ? <span aria-hidden="true"> · </span> : null}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
