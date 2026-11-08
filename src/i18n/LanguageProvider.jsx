import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_LANG, LANGS, LangContext, STORAGE_KEY } from "./context";
import { ui } from "./ui";

const isSupported = (code) => LANGS.some((l) => l.code === code);

function initialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isSupported(saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode); fall back to English.
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((code) => {
    if (!isSupported(code)) return;
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Ignore: the choice still applies for this visit.
    }
  }, []);

  const t = ui[lang];

  // Keep the document language, title and description in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
  }, [lang, t]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
