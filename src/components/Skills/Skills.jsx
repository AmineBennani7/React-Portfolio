import { useContent, useLang } from "../../i18n/context";
import { SectionHead } from "../ui/SectionHead";
import styles from "./Skills.module.css";

export function Skills() {
  const { t } = useLang();
  const { expertise } = useContent();
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className="container">
        <SectionHead id="skills-title" title={t.sections.skills} />
        <div className={styles.domains}>
          {expertise.map((d) => (
            <article key={d.evidence[0].label + d.items[0]} className={styles.domain} data-reveal>
              <h3 className={styles.domainName}>{d.domain}</h3>
              <ul className={styles.stack}>
                {d.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className={styles.evidence}>
                <span>{t.skills.usedIn}</span>
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
