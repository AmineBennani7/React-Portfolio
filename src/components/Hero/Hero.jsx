import { profile } from "../../data/profile";
import { Picture } from "../ui/Picture";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h1 id="hero-title" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.role}>{profile.role}</p>

          <div className={styles.intro}>
            <p>
              I&apos;m a Software &amp; AI Engineer currently working at Sword Group in Luxembourg, where I develop AI
              applications, data integration solutions and automation workflows for the logistics sector.
            </p>
            <p>
              I hold an MSc in Artificial Intelligence with Distinction from Oxford Brookes University and a degree in
              Computer Engineering from the University of Seville.
            </p>
            <p>
              My background includes software development, computer vision and autonomous systems, including perception
              for a Formula Student driverless car. I&apos;m particularly interested in robotics and space technology, and
              I enjoy learning new technologies and taking on new challenges.
            </p>
            <p>
              Having studied and worked in Spain, the UK and Luxembourg, I speak French, Spanish and English fluently, as
              well as conversational Arabic.
            </p>
          </div>

          <div className={styles.links}>
            <a className={styles.primary} href="#work">
              See my projects
            </a>
            <a className={styles.secondary} href={profile.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondary} href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondary} href="#contact">
              Contact
            </a>
          </div>
        </div>

        <figure className={styles.photo}>
          <Picture image="about/headshot" alt="Amine Bennani" sizes="200px" eager />
        </figure>
      </div>
    </section>
  );
}
