import { experience } from "../../data/profile";
import { SectionHead } from "../ui/SectionHead";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          index="02"
          label="Experience"
          title={
            <>
              AI engineering, perception <span className="serif">and software.</span>
            </>
          }
        >
          AI and data engineering in consulting, autonomous perception in Formula Student, and backend development
          at Sopra Steria.
        </SectionHead>

        <ol className={styles.timeline}>
          {experience.map((job) => (
            <li key={job.org} className={styles.row} data-reveal>
              <div className={styles.when}>
                <span className={styles.year} aria-hidden="true">
                  {job.start}
                </span>
                <span className={styles.period}>{job.period}</span>
              </div>
              <div className={styles.what}>
                <h3 className={styles.role}>{job.role}</h3>
                <p className={styles.org}>
                  {job.org}
                  <span className={styles.context}>{job.context}</span>
                </p>
              </div>
              <div className={styles.detail}>
                <p>{job.summary}</p>
                <ul className={styles.tags} aria-label="Tools">
                  {job.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
