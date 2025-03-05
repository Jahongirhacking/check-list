import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { localStorageNames } from "./utils/config";
import { getLocalStorage } from "./utils/storageUtils";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        create_activity: "Create activity",
        all: "All",
        sport: "Sport",
        learning: "Learning",
        daily: "Daily",
        other: "Other",
        add: "Add",
        edit: "Edit",
        activity_sub: "activity",
        activity: "Activity",
        sentence: "{{verb}} {{subject}}",
        partial: "Partial activity",
        enter: "Enter",
        name: "name",
        unit: "Unit",
        number_of: "Number of",
        parts: "parts",
        unit_ex: "(page, part, series, etc.)",
        added_success: "is added successfully!",
        back: "Back",
        cancel: "Cancel",
        new_image: "New image",
        reset: "Reset",
        delete: "Delete",
        upward: "Upward",
        downward: "Downward",
        exercise: "Exercise",
        reps: "reps",
        sets: "sets",
        choose_activity: "Choose the type of activity",
        logout: "Logout",
      },
    },
    uz: {
      translation: {
        create_activity: "Mashg‘ulot yaratish",
        all: "Hammasi",
        sport: "Sport",
        learning: "O‘qish",
        daily: "Kundalik",
        other: "Boshqa",
        add: "qo‘shish",
        edit: "o‘zgartirish",
        activity_sub: "mashg‘uloti",
        activity: "Mashg‘ulot",
        sentence: "{{subject}} {{verb}}",
        partial_activity: "Qismli mashg‘ulot",
        enter: "kiriting",
        name: "nomi",
        unit: "Qism",
        number_of: "soni",
        parts: "Qismlar",
        unit_ex: "(sahifa, qism, serial, h.k)",
        added_success: "muvaffaqiyatli qo‘shildi!",
        back: "Orqaga",
        cancel: "Bekor qilish",
        new_image: "Yangi rasm",
        reset: "Tozalash",
        delete: "O‘chirish",
        upward: "Tepaga",
        downward: "Pastga",
        exercise: "Mashq",
        reps: "takror",
        sets: "setlar",
        choose_activity: "Mashg‘ulot turini tanlang",
        logout: "Chiqish",
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
