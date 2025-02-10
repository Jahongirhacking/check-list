import { Handler } from "@netlify/functions";
import axios from "axios";
const BOT_TOKEN = "7694451864:AAERgoIGkyEeBUvoXgNoKfTiQHVZrQ2mfwc";

const handler: Handler = async (event) => {
  try {
    const chat_id = JSON.parse(event.body).chat_id;
    const data = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id, // `id` is userId which is the same as chatId in private chats
        text: `Salom! Sizning chatID: ${chat_id} `,
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
