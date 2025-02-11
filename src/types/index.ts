import moment from "moment";

export interface IGeneralTaskProps {
  id?: string;
  type?: "sport" | "science" | "daily" | "other";
  isDone?: boolean;
  isCountable?: boolean;
  createdAt?: number;
  order?: number;
  img?: string;
  name?: string;
  current?: number;
}

export interface ISportTaskProps extends IGeneralTaskProps {
  reps?: number;
  totalSets?: number;
}

export interface IDefaultTaskProps extends IGeneralTaskProps {
  partUnit?: string;
  totalPart?: number;
}

export const generateGeneralTasksMessage = (
  tasks: IGeneralTaskProps[]
): string => {
  moment.locale("uz");
  let message = "";
  message += `${moment().format("📅 DD.MM.YYYY - dddd - HH:mm\n\n")}`;
  const sports: ISportTaskProps[] = [];
  const sciences: IDefaultTaskProps[] = [];
  const dailies: IDefaultTaskProps[] = [];
  const others: IDefaultTaskProps[] = [];
  tasks.forEach((task) => {
    switch (task.type) {
      case "sport": {
        sports.push(task);
        break;
      }
      case "science": {
        sciences.push(task);
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
  if (!sports.length && !sciences.length && !dailies.length && !others.length) {
    message += `Sizda hech qanday mashg‘ulot yo‘q 🤷‍♂️\n\n[Mashg‘ulot qo‘shish](https://check-todo-list.netlify.app/)`;
    return message;
  }
  if (sports.length) {
    message += `*Sport mashg‘ulotlari:*\n`;
    sports.forEach((task) => (message += generateSportTaskMessage(task)));
    message += "\n";
  }
  if (sciences.length) {
    message += `*Ilmiy mashg‘ulotlar:*\n`;
    sciences.forEach((task) => (message += generateDefaultTask(task)));
    message += "\n";
  }
  if (dailies.length) {
    message += `*Kunlik mashg‘ulotlar:*\n`;
    dailies.forEach((task) => (message += generateDefaultTask(task)));
    message += "\n";
  }
  if (others.length) {
    message += `*Boshqa mashg‘ulotlar:*\n`;
    others.forEach((task) => (message += generateDefaultTask(task)));
    message += "\n";
  }
  message += "\n";
  message += `[Checklist](https://check-todo-list.netlify.app/)`;
  return message;
};

export const generateSportTaskMessage = (task: ISportTaskProps) => {
  let string = "";
  const percent =
    task.totalSets === 0
      ? 0
      : ((task.current ?? 0) / (task.totalSets ?? 1)) * 100;
  string += `${percent === 0 ? "🚫" : percent === 100 ? "✅" : "⚠️"} `;
  string += `${task.reps} ${task.name} - *${task.current} / ${task.totalSets}*\n`;
  return string;
};

export const generateDefaultTask = (task: IDefaultTaskProps) => {
  let string = "";
  if (task.isCountable) {
    const percent =
      task.totalPart === 0
        ? 0
        : ((task.current ?? 0) / (task.totalPart ?? 1)) * 100;
    string += `${percent === 0 ? "🚫" : percent === 100 ? "✅" : "⚠️"} `;
  }
  string += `${!task.isCountable ? (task.isDone ? "✅" : "🚫") : ""} ${
    task.name
  }${task.isCountable ? ` - *${task.current} / ${task.totalPart}*` : ""}\n`;
  return string;
};
