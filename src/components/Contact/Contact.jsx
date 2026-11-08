import { useState } from "react";
import { profile } from "../../data/profile";
import { useLang } from "../../i18n/context";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className={styles.title} data-reveal>
          {t.sections.contact}
        </h2>
        <p className={styles.intro} data-reveal>
          {t.contact.intro}
        </p>

        <div className={styles.emailRow} data-reveal>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button type="button" className={styles.copy} onClick={copy}>
            {copied ? t.contact.copied : t.contact.copy}
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copied ? t.contact.copiedLive : ""}
          </span>
        </div>

        <ul className={styles.links} data-reveal>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <span className={styles.linkLabel}>LinkedIn</span>
              <span className={styles.linkMeta}>amine-bennani</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <span className={styles.linkLabel}>GitHub</span>
              <span className={styles.linkMeta}>AmineBennani7</span>
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>

        <div className={styles.base}>
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>{t.contact.builtWith}</p>
          <a href="#top" className={styles.top}>
            {t.contact.backToTop} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
