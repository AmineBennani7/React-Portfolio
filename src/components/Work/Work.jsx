import { useCallback, useEffect, useMemo, useState } from "react";
import { projects as sourceProjects } from "../../data/projects";
import { useContent, useLang } from "../../i18n/context";
import { SectionHead } from "../ui/SectionHead";
import { CaseStudy } from "./CaseStudy";
import { FeaturedCard } from "./FeaturedCard";
import { OtherProjects } from "./OtherProjects";
import styles from "./Work.module.css";

// Which slugs have a case study does not depend on the language.
const caseSlugs = new Set(sourceProjects.filter((p) => p.caseStudy).map((p) => p.slug));

const slugFromHash = () => {
  const m = window.location.hash.match(/^#work\/([\w-]+)$/);
  return m && caseSlugs.has(m[1]) ? m[1] : null;
};

const matches = (filter) => (item) => filter === "all" || item.categories.includes(filter);

export function Work() {
  const { t } = useLang();
  const { projects, archive, categories, featured: featuredSlugs } = useContent();
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState(null);

  const { bySlug, featured, others } = useMemo(() => {
    const map = Object.fromEntries(projects.map((p) => [p.slug, p]));
    return {
      bySlug: map,
      featured: featuredSlugs.map((slug) => map[slug]),
      // Projects with a case study that are not featured, followed by the smaller ones.
      others: [
        ...projects
          .filter((p) => !featuredSlugs.includes(p.slug))
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
      ],
    };
  }, [projects, archive, featuredSlugs]);

  const visibleFeatured = useMemo(() => featured.filter(matches(filter)), [featured, filter]);
  const visibleOthers = useMemo(() => others.filter(matches(filter)), [others, filter]);

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
        <SectionHead id="work-title" title={t.sections.projects} />

        <div className={styles.toolbar} data-reveal>
          <div className={styles.filters} role="group" aria-label={t.work.filterLabel}>
            {categories.map((c) => {
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
            {t.work.showing(visibleFeatured.length + visibleOthers.length, total)}
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
