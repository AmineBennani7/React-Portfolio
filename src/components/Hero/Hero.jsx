import { profile } from "../../data/profile";
import { useLang } from "../../i18n/context";
import { Picture } from "../ui/Picture";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = useLang();
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
        <span className={`${styles.blob} ${styles.blobC}`} />
        <span className={styles.grid} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.text}>
          <h1 id="hero-title" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.role}>{t.hero.role}</p>

          <div className={styles.intro}>
            {t.hero.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className={styles.links}>
            <a className={styles.primary} href="#work">
              {t.hero.projects}
            </a>
            <a className={styles.secondary} href={profile.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondary} href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className={styles.secondary} href="#contact">
              {t.hero.contact}
            </a>
          </div>
        </div>

        <figure className={styles.photo}>
          <Picture image="about/headshot" alt={t.hero.photoAlt} sizes="200px" eager />
        </figure>
      </div>
    </section>
  );
}
