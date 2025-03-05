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
        send_bot: "Send to bot",
        message_success: "Message is sent successfully!",
        message_error: "Error on sending message",
        delete_all:
          "Are you sure you want to delete all your workouts so you can't restore them later?",
        reset_all:
          "Do you want to clear all training sessions, meaning all training metrics will be reset? Are you okay with that?",
        delete_one:
          "Are you sure you want to delete the {{name}} activity so that you can't restore it later?",
        reset_one:
          "Do you want to clear the {{name}} activity, meaning that its pointer will be reset to its original state?",
        login_success: "Login is successful!",
        completed_activities: "Completed activities",
        activities: "activities",
        track_your_activities: "track your activities!",
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
        send_bot: "Botga yuborish",
        message_success: "Xabar muvaffaqiyatli yuborildi!",
        message_error: "Xabarni yuborishda xatolik",
        delete_all:
          "Barcha mashg‘ulotlarni o‘chirib yuborishga rozimisiz? Mashg‘ulotlarni qayta tiklay olmaysiz!",
        reset_all:
          "Barcha mashg‘ulotlarni tozalashga rozimisiz, ya’ni barcha mashg‘ulot ko‘rsatkichlari nolga qaytariladi",
        delete_one:
          "{{name}} mashg‘ulotini o‘chirib yuborishga rozimisiz? Mashg‘ulotni qayta tiklay olmaysiz!",
        reset_one:
          "{{name}} mashg‘ulotini tozalashga rozimisiz, ya’ni mashg‘ulot ko‘rsatkichi nolga qaytariladi",
        login_success: "Tizimga muvaffaqiyatli kirdingiz!",
        completed_activities: "Bajarilgan mashg‘ulotlar",
        activities: "mashg‘ulotlar",
        track_your_activities: "mashg‘ulotlaringizni nazoratga oling!",
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
