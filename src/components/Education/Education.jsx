import { useContent, useLang } from "../../i18n/context";
import { SectionHead } from "../ui/SectionHead";
import styles from "./Education.module.css";

export function Education() {
  const { t } = useLang();
  const { education } = useContent();
  return (
    <section id="education" className={styles.section} aria-labelledby="education-title">
      <div className="container">
        <SectionHead id="education-title" title={t.sections.education} />
        <ul className={styles.list}>
          {education.map((e) => (
            <li key={e.year} className={styles.item} data-reveal>
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
