import { profile } from "../../data/profile";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <h1 id="hero-title" className={styles.name}>
          {profile.name}
        </h1>
        <p className={styles.role}>{profile.role}</p>

        <div className={styles.intro}>
          <p>
            I&apos;m a Data &amp; AI Engineer based in Luxembourg. I studied Computer Engineering at the University of
            Seville and then did an MSc in Artificial Intelligence at Oxford Brookes University, which I finished with
            Distinction.
          </p>
          <p>
            So far I&apos;ve worked on software development, AI applications, computer vision and autonomous systems,
            including perception for a Formula Student driverless car. I want to keep growing, especially in robotics,
            autonomous systems and space technology.
          </p>
          <p>
            I&apos;ve studied and worked in Spain, the UK and Luxembourg, and I enjoy working in international teams. I
            speak French, Spanish and English fluently, and conversational Arabic.
          </p>
        </div>

        <div className={styles.links}>
          <a className={styles.primary} href="#work">
            See my projects
          </a>
          <a className={styles.secondary} href={profile.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.secondary} href="#contact">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
