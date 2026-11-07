import { education, expertise } from "../../data/profile";
import { SectionHead } from "../ui/SectionHead";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about-title" title="Education and skills" />

        <ul className={styles.education} data-reveal>
          {education.map((e) => (
            <li key={e.title}>
              <span className={styles.eduYear}>{e.year}</span>
              <span className={styles.eduMain}>
                <span className={styles.itemTitle}>{e.title}</span>
                <span className={styles.itemOrg}>{e.org}</span>
                <span className={styles.itemNote}>{e.note}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.domains} aria-label="Skills">
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
