import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const lastLanguageUsed = localStorage.getItem("language");

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    preload: ['en', 'ar'],
    initImmediate: true,
    fallbackLng: "en",
    supportedLngs: ["ar", "en"],
    detection: {
      order: ["cookie", "htmlTag"],
      lookupCookie: "language",
      caches: ["cookie"],
      htmlTag: document.documentElement,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    react: {
      useSuspense: false,
    },
    lng: lastLanguageUsed || "en",
  });

export default i18next;
