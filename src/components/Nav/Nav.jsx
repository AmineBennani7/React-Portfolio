import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import styles from "./Nav.module.css";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
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
    const ids = links.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
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

        <nav aria-label="Primary">
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className={styles.burger} aria-hidden="true" />
          </button>
          <ul id="primary-menu" className={styles.links}>
            {links.map((l, i) => (
              <li key={l.href} style={{ "--i": i }}>
                <a
                  href={l.href}
                  aria-current={active === l.href.slice(1) ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
