import { createContext, useContext, useMemo } from "react";
import { getContent } from "./content";

export const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

export const DEFAULT_LANG = "en";
export const STORAGE_KEY = "portfolio-lang";

export const LangContext = createContext(null);

/** { lang, setLang, t } where t holds the interface strings for the current language. */
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

/** Projects, experience, education, skills and archive in the current language. */
export function useContent() {
  const { lang } = useLang();
  return useMemo(() => getContent(lang), [lang]);
}
