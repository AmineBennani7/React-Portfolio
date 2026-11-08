import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import { useLang } from "../../i18n/context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "#experience", key: "experience" },
  { href: "#education", key: "education" },
  { href: "#work", key: "projects" },
  { href: "#skills", key: "skills" },
  { href: "#contact", key: "contact" },
];

export function Nav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add("is-locked");
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`${styles.bar} ${scrolled ? styles.scrolled : ""} ${open ? styles.isOpen : ""}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <span className={styles.mark} aria-hidden="true">
            AB
          </span>
          <span className={styles.brandName}>{profile.name}</span>
        </a>

        <nav aria-label={t.nav.label} className={styles.nav}>
          <ul id="primary-menu" className={styles.links}>
            {LINKS.map((l, i) => (
              <li key={l.href} style={{ "--i": i }}>
                <a
                  href={l.href}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <LanguageSwitcher />
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
            <span className={styles.burger} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
