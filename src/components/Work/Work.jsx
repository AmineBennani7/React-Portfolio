import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES, projects } from "../../data/projects";
import { SectionHead } from "../ui/SectionHead";
import { CaseStudy } from "./CaseStudy";
import { ProjectFeature } from "./ProjectFeature";
import styles from "./Work.module.css";

const slugFromHash = () => {
  const m = window.location.hash.match(/^#work\/([\w-]+)$/);
  return m && projects.some((p) => p.slug === m[1]) ? m[1] : null;
};

export function Work() {
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState(null);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  // Deep links: #work/<slug> opens the case study (also used by the expertise section).
  useEffect(() => {
    const sync = () => {
      const slug = slugFromHash();
      if (slug) setOpenSlug(slug);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const open = useCallback((slug) => {
    history.replaceState(null, "", `#work/${slug}`);
    setOpenSlug(slug);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, "", "#work");
    setOpenSlug(null);
  }, []);

  const current = projects.find((p) => p.slug === openSlug) || null;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" title="Projects" />

        <div className={styles.toolbar} data-reveal>
          <div className={styles.filters} role="group" aria-label="Filter projects by discipline">
            {CATEGORIES.map((c) => {
              const count =
                c.id === "all" ? projects.length : projects.filter((p) => p.categories.includes(c.id)).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={styles.chip}
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                >
                  {c.label}
                  <span className={styles.count}>{count}</span>
                </button>
              );
            })}
          </div>
          <p className="visually-hidden" aria-live="polite">
            Showing {visible.length} of {projects.length} projects
          </p>
        </div>

        <ol className={styles.list}>
          {visible.map((p, i) => (
            <ProjectFeature key={p.slug} project={p} flip={i % 2 === 1} onOpen={open} eager={false} />
          ))}
        </ol>
      </div>

      <CaseStudy project={current} onClose={close} />
    </section>
  );
}
