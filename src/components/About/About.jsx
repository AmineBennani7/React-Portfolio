import { education, expertise, languages } from "../../data/profile";
import { Picture } from "../ui/Picture";
import { SectionHead } from "../ui/SectionHead";
import styles from "./About.module.css";

const interests = ["Robotics", "Autonomous systems", "Space technology", "Computer vision", "AI engineering"];

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about-title" title="About" />

        <div className={styles.grid}>
          <figure className={styles.portrait} data-reveal>
            <Picture image="about/portrait" alt="Amine Bennani in Oxford" sizes="200px" />
          </figure>

          <div className={styles.facts} data-reveal>
            <div className={styles.group}>
              <h3 className={styles.groupTitle}>Education</h3>
              <ul className={styles.list}>
                {education.map((e) => (
                  <li key={e.title}>
                    <span className={styles.itemTitle}>
                      {e.title}, {e.org}
                    </span>
                    <span className={styles.itemNote}>
                      {e.year} · {e.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.group}>
              <h3 className={styles.groupTitle}>Languages</h3>
              <ul className={styles.inline}>
                {languages.map((l) => (
                  <li key={l.name}>
                    {l.name} <span className={styles.itemNote}>({l.level})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.group}>
              <h3 className={styles.groupTitle}>Interests</h3>
              <ul className={styles.chips}>
                {interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.skills} aria-labelledby="skills-title">
          <h3 id="skills-title" className={styles.skillsTitle} data-reveal>
            Skills
          </h3>
          <div className={styles.domains}>
            {expertise.map((d) => (
              <article key={d.domain} className={styles.domain} data-reveal>
                <h4 className={styles.domainName}>{d.domain}</h4>
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
      </div>
    </section>
  );
}
