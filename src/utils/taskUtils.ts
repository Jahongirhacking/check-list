import { t } from "i18next";
import moment from "moment";
import i18n from "../i18n";
import {
  IDefaultTaskProps,
  IGeneralTaskProps,
  ISportTaskProps,
} from "../types";

moment.updateLocale("uz", {
  weekdays: [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ],
  weekdaysShort: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],
});

export const generateGeneralTasksMessage = (
  tasks: IGeneralTaskProps[]
): string => {
  moment.locale(i18n.language === "uz" ? "uz" : "en");
  let message = "";
  message += `${moment().format("📅 DD.MM.YYYY - dddd - HH:mm")}`;
  message += "\n\n";
  const sports: ISportTaskProps[] = [];
  const learnings: IDefaultTaskProps[] = [];
  const dailies: IDefaultTaskProps[] = [];
  const others: IDefaultTaskProps[] = [];
  tasks.forEach((task) => {
    switch (task.type) {
      case "sport": {
        sports.push(task);
        break;
      }
      case "learning": {
        learnings.push(task);
        break;
      }
      case "daily": {
        dailies.push(task);
        break;
      }
      case "other": {
        others.push(task);
        break;
      }
    }
  });
  if (
    !sports.length &&
    !learnings.length &&
    !dailies.length &&
    !others.length
  ) {
    message += `<a href="https://checklist-bot.netlify.app/">${t(
      "create_activity"
    )}</a>`;
    return message;
  }
  if (sports.length) {
    message += `<b>${t("sport")} ${t("activities")}:</b>\n`;
    sports.forEach((task) => (message += generateSportTaskMessage(task)));
    message += "\n";
  }
  if (learnings.length) {
    message += `<b>${t("learning")} ${t("activities")}:</b>\n`;
    learnings.forEach((task) => (message += generateDefaultTask(task)));
    message += "\n";
  }
  if (dailies.length) {
    message += `<b>${t("daily")} ${t("activities")}:</b>\n`;
    dailies.forEach((task) => (message += generateDefaultTask(task)));
    message += "\n";
  }
  if (others.length) {
    message += `<b>${t("other")} ${t("activities")}:</b>\n`;
    others.forEach((task) => (message += generateDefaultTask(task)));
    message += "\n";
  }
  message += `<a href="https://checklist-bot.netlify.app/">Checklist App - ${t(
    "track_your_activities"
  )}</a>`;
  return message;
};

export const escapeMarkdown = (text: string) => {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&"); // Escapes special characters
};

export const generateSportTaskMessage = (task: ISportTaskProps) => {
  let string = "";
  const percent =
    task.totalSets === 0
      ? 0
      : ((task.current ?? 0) / (task.totalSets ?? 1)) * 100;
  string += `${percent === 0 ? "🚫" : percent >= 100 ? "✅" : "⚠️"} `;
  string += `${task.reps} ${task.name} - <b>${task.current} / ${task.totalSets} sets</b>\n`;
  return string;
};

export const generateDefaultTask = (task: IDefaultTaskProps) => {
  let string = "";
  if (task.isCountable) {
    const percent =
      task.totalPart === 0
        ? 0
        : ((task.current ?? 0) / (task.totalPart ?? 1)) * 100;
    string += `${percent === 0 ? "🚫" : percent >= 100 ? "✅" : "⚠️"} `;
  }
  string += `${!task.isCountable ? (task.isDone ? "✅" : "🚫") : ""} ${
    task.name
  }${
    task.isCountable
      ? ` - <b>${task.current} / ${task.totalPart} ${task.partUnit}</b>`
      : ""
  }\n`;
  return string;
};

const IMAGES_LENGTH = 8;
export const generateTaskImage = (taskType: IGeneralTaskProps["type"]) => {
  return `/images/${taskType}/${
    Math.floor(Math.random() * IMAGES_LENGTH) + 1
  }.jpg`;
};
