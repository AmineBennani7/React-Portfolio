import { education, expertise } from "../../data/profile";
import { Picture } from "../ui/Picture";
import { SectionHead } from "../ui/SectionHead";
import styles from "./About.module.css";

const interests = ["AI engineering", "Computer vision", "Robotics", "Autonomous systems", "Software engineering"];

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          index="03"
          label="About"
          title={
            <>
              Software and AI engineer <span className="serif">in Luxembourg.</span>
            </>
          }
        />

        <div className={styles.grid}>
          <figure className={styles.portrait} data-reveal>
            <Picture image="about/portrait" alt="Amine Bennani in a suit in front of a historic stone building in Oxford, at dusk" sizes="(min-width: 1024px) 30vw, 90vw" />
            <figcaption className="mono">Oxford</figcaption>
          </figure>

          <div className={styles.text}>
            <p className={styles.lead} data-reveal>
              I&apos;m a software and AI engineer with an MSc in Artificial Intelligence from Oxford Brookes University
              and a BSc in Computer Engineering from the University of Seville.
            </p>
            <p data-reveal>
              At Oxford Brookes I worked on perception for the Formula Student autonomous racing team, and my
              dissertation focused on tracking small, fast-moving objects under motion blur. I now work at Sword Group
              as a Data &amp; AI Engineer, building Python applications, data integrations and LLM-based automation.
            </p>
            <p data-reveal>
              I want to keep growing in AI engineering, computer vision, robotics and autonomous systems. I speak
              French, Spanish and English.
            </p>

            <dl className={styles.edu} data-reveal>
              {education.map((e) => (
                <div key={e.title} className={styles.eduRow}>
                  <dt>
                    <span className={styles.eduYear}>{e.year}</span>
                    <span className={styles.eduTitle}>{e.title}</span>
                  </dt>
                  <dd>
                    <span className={styles.eduOrg}>{e.org}</span>
                    {e.note}
                  </dd>
                </div>
              ))}
            </dl>

            <div className={styles.interests} data-reveal>
              <p className="mono">Interests</p>
              <ul>
                {interests.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.expertise} aria-labelledby="expertise-title">
          <h3 id="expertise-title" className={styles.expertiseTitle} data-reveal>
            <span className="mono">Technical expertise</span>
            Main tools by area, with links to related work.
          </h3>
          <div className={styles.domains}>
            {expertise.map((d, i) => (
              <article key={d.domain} className={styles.domain} data-reveal style={{ "--reveal-delay": `${i * 90}ms` }}>
                <h4 className={styles.domainName}>
                  <span className={styles.domainNum}>{String(i + 1).padStart(2, "0")}</span>
                  {d.domain}
                </h4>
                <ul className={styles.stack}>
                  {d.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className={styles.evidence}>
                  <span className="mono">See</span>
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
