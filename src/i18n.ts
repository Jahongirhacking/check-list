import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocalStorage } from "./utils/storageUtils";
import { localStorageNames } from "./utils/config";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        create_activity: "Create activity",
      },
    },
    uz: {
      translation: {
        create_activity: "Mashg‘ulot yaratish",
      },
    },
  },
  lng: getLocalStorage(localStorageNames.lang) || "uz", // Default language
  fallbackLng: "uz", // Fallback if language is not available
  interpolation: {
    escapeValue: false, // React already protects against XSS
  },
});

export default i18n;
