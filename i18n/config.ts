import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import each language's translation namespaces here as you build them.
// For now, just an empty "common" namespace per language to prove the
// wiring works — real page content gets added page by page.
import enCommon from "./locales/en/common.json";
import esCommon from "./locales/es/common.json";
import frCommon from "./locales/fr/common.json";
import arCommon from "./locales/ar/common.json";
import zhCommon from "./locales/zh/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      es: { common: esCommon },
      fr: { common: frCommon },
      ar: { common: arCommon },
      zh: { common: zhCommon },
    },
    fallbackLng: "en", // if a key is missing in the active language, show English rather than a blank
    defaultNS: "common",
    interpolation: {
      escapeValue: false, // React already escapes output, so i18next doesn't need to do it again
    },
  });

export default i18n;
  