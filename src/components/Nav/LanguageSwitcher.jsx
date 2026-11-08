import { useId } from "react";
import { LANGS, useLang } from "../../i18n/context";
import styles from "./LanguageSwitcher.module.css";

// Inline SVG flags: emoji flags do not render on Windows.
function FlagGB() {
  const id = useId();
  return (
    <svg viewBox="0 0 60 30" className={styles.flag} aria-hidden="true">
      <clipPath id={`${id}s`}>
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id={`${id}t`}>
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath={`url(#${id}s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath={`url(#${id}t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function FlagFR() {
  return (
    <svg viewBox="0 0 3 2" className={styles.flag} aria-hidden="true">
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg viewBox="0 0 3 2" className={styles.flag} aria-hidden="true">
      <rect width="3" height="2" fill="#AA151B" />
      <rect y="0.5" width="3" height="1" fill="#F1BF00" />
    </svg>
  );
}

const FLAGS = { en: FlagGB, fr: FlagFR, es: FlagES };

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();
  return (
    <div className={styles.switcher} role="group" aria-label={t.nav.language}>
      {LANGS.map((l, i) => {
        const Flag = FLAGS[l.code];
        return (
          <span key={l.code} className={styles.item}>
            {i > 0 && (
              <span className={styles.sep} aria-hidden="true">
                ·
              </span>
            )}
            <button
              type="button"
              className={styles.button}
              aria-pressed={lang === l.code}
              aria-label={t.nav.langNames[l.code]}
              lang={l.code}
              title={t.nav.langNames[l.code]}
              onClick={() => setLang(l.code)}
            >
              <Flag />
              <span className={styles.code}>{l.label}</span>
            </button>
          </span>
        );
      })}
    </div>
  );
}
