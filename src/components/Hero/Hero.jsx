import { profile } from "../../data/profile";
import { TrajectoryField } from "./TrajectoryField";
import styles from "./Hero.module.css";

const focus = ["Computer vision", "Autonomous systems", "LLM applications", "Software engineering"];

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.meta}>
          <span className="mono">Portfolio — 2026</span>
          <span className="mono">Based in {profile.location}</span>
        </div>

        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.name}>
            <span className={styles.line}>
              <span>Amine</span>
            </span>
            <span className={styles.line}>
              <span>Bennani</span>
            </span>
          </h1>
          <p className={styles.role}>
            <span className={styles.dot} aria-hidden="true" />
            {profile.role}
          </p>
          <p className={styles.statement}>
            I build AI software, <span className="serif">from computer vision to LLM applications.</span>
          </p>
          <p className={styles.credential}>
            <span className="mono">MSc Artificial Intelligence — Distinction</span>
            <span>Oxford Brookes University</span>
          </p>
          <div className={styles.ctas}>
            <a className={styles.primary} href="#work">
              Explore work
              <span aria-hidden="true">↓</span>
            </a>
            <a className={styles.secondary} href={profile.github} target="_blank" rel="noreferrer">
              View GitHub
              <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondary} href="#contact">
              Contact me
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <TrajectoryField />
        </div>

        <ol className={styles.focus} aria-label="Areas of work">
          {focus.map((f, i) => (
            <li key={f}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              {f}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
