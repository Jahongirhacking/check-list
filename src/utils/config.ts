export const telegramBotUsername = "check_todo_list_bot";

export const backendBaseUrl = "/.netlify/functions";
export const sendMessageUrl = `${backendBaseUrl}/send-message`;
export const getUpdatesUrl = `${backendBaseUrl}/get-updates`;
export const getGistsUrl = `${backendBaseUrl}/get-gists`;
export const patchGistUrl = `${backendBaseUrl}/patch-gist-by-id`;
export const postGistUrl = `${backendBaseUrl}/post-gist`;
export const getGistByIdUrl = `${backendBaseUrl}/get-gist-by-id`;

export const localStorageNames = {
  user: "user",
  themeColor: "theme-color",
  tasks: "tasks",
  chat_id: "chat-id",
};
