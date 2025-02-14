import { Handler } from "@netlify/functions";
import axios from "axios";
import { BOT_TOKEN } from "../utils/config";

const handler: Handler = async (event) => {
  try {
    const chat_id = JSON.parse(event.body).chat_id;
    const text = JSON.parse(event.body).text;
    const { data } = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id, // `id` is userId which is the same as chatId in private chats
        text,
        parse_mode: "HTML",
      }
    );
    return {
      statusCode: 201,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "failed to parse request body",
        error: err?.message,
      }),
    };
  }
};

export { handler };
