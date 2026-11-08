import { archive, education, experience, expertise } from "../data/profile";
import { CATEGORIES, FEATURED, projects } from "../data/projects";
import { es } from "./content/es";
import { fr } from "./content/fr";
import { deepMerge } from "./localize";

const overlays = { fr, es };
const cache = new Map();

/** All page content in one language. English is the source; FR/ES are overlays. */
export function getContent(lang) {
  if (cache.has(lang)) return cache.get(lang);
  const o = overlays[lang];

  const content = o
    ? {
        categories: CATEGORIES.map((c) => ({ ...c, label: o.categories?.[c.id] ?? c.label })),
        projects: projects.map((p) => deepMerge(p, o.projects?.[p.slug])),
        experience: experience.map((job) => deepMerge(job, o.experience?.[job.id])),
        education: deepMerge(education, o.education),
        expertise: deepMerge(expertise, o.expertise),
        archive: deepMerge(archive, o.archive),
        featured: FEATURED,
      }
    : { categories: CATEGORIES, projects, experience, education, expertise, archive, featured: FEATURED };

  cache.set(lang, content);
  return content;
}
