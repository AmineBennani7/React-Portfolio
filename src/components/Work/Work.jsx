import { useCallback, useEffect, useMemo, useState } from "react";
import { archive } from "../../data/profile";
import { CATEGORIES, FEATURED, projects } from "../../data/projects";
import { SectionHead } from "../ui/SectionHead";
import { CaseStudy } from "./CaseStudy";
import { FeaturedCard } from "./FeaturedCard";
import { OtherProjects } from "./OtherProjects";
import styles from "./Work.module.css";

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const featured = FEATURED.map((slug) => bySlug[slug]);

// Projects with a case study that are not featured, followed by the smaller ones.
const others = [
  ...projects
    .filter((p) => !FEATURED.includes(p.slug))
    .map((p) => ({
      slug: p.slug,
      year: p.year,
      title: p.title,
      note: p.headline,
      stack: p.tags.slice(0, 4).join(" · "),
      href: p.repo,
      repoPrivate: p.repoPrivate,
      categories: p.categories,
    })),
  ...archive,
];

const slugFromHash = () => {
  const m = window.location.hash.match(/^#work\/([\w-]+)$/);
  return m && bySlug[m[1]]?.caseStudy ? m[1] : null;
};

const matches = (filter) => (item) => filter === "all" || item.categories.includes(filter);

export function Work() {
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState(null);

  const visibleFeatured = useMemo(() => featured.filter(matches(filter)), [filter]);
  const visibleOthers = useMemo(() => others.filter(matches(filter)), [filter]);

  // Deep links: #work/<slug> opens the case study.
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

  const current = openSlug ? bySlug[openSlug] : null;
  const total = featured.length + others.length;

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <SectionHead id="work-title" title="Projects" />

        <div className={styles.toolbar} data-reveal>
          <div className={styles.filters} role="group" aria-label="Filter projects by field">
            {CATEGORIES.map((c) => {
              const count = c.id === "all" ? total : [...featured, ...others].filter(matches(c.id)).length;
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
            Showing {visibleFeatured.length + visibleOthers.length} of {total} projects
          </p>
        </div>

        {visibleFeatured.length > 0 && (
          <ul className={styles.grid}>
            {visibleFeatured.map((p) => (
              <FeaturedCard key={p.slug} project={p} onOpen={open} />
            ))}
          </ul>
        )}

        <OtherProjects items={visibleOthers} onOpen={open} />
      </div>

      <CaseStudy project={current} onClose={close} />
    </section>
  );
}
