import { education } from "../../data/profile";
import { SectionHead } from "../ui/SectionHead";
import styles from "./Education.module.css";

export function Education() {
  return (
    <section id="education" className={styles.section} aria-labelledby="education-title">
      <div className="container">
        <SectionHead id="education-title" title="Education" />
        <ul className={styles.list}>
          {education.map((e) => (
            <li key={e.title} className={styles.item} data-reveal>
              <p className={styles.year}>{e.year}</p>
              <div className={styles.main}>
                <h3 className={styles.title}>{e.title}</h3>
                <p className={styles.org}>{e.org}</p>
              </div>
              <p className={styles.note}>{e.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
