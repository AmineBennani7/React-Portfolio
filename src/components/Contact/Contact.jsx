import { useState } from "react";
import { profile } from "../../data/profile";
import styles from "./Contact.module.css";

export function Contact() {
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

  const cvRequest = `mailto:${profile.email}?subject=${encodeURIComponent("CV request")}`;

  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className={styles.title} data-reveal>
          Contact
        </h2>
        <p className={styles.intro} data-reveal>
          The easiest way to reach me is by email. I&apos;m also on LinkedIn and GitHub.
        </p>

        <div className={styles.emailRow} data-reveal>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button type="button" className={styles.copy} onClick={copy}>
            {copied ? "Copied" : "Copy"}
          </button>
          <span className="visually-hidden" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
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
          <li>
            {profile.cvUrl ? (
              <a href={profile.cvUrl} target="_blank" rel="noreferrer" download>
                <span className={styles.linkLabel}>CV</span>
                <span className={styles.linkMeta}>PDF</span>
                <span aria-hidden="true">↓</span>
              </a>
            ) : (
              <a href={cvRequest}>
                <span className={styles.linkLabel}>CV</span>
                <span className={styles.linkMeta}>on request, by email</span>
                <span aria-hidden="true">→</span>
              </a>
            )}
          </li>
        </ul>

        <div className={styles.base}>
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with React and Vite.</p>
          <a href="#top" className={styles.top}>
            Back to top <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
