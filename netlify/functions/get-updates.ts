import { Handler } from "@netlify/functions";
import axios from "axios";
const BOT_TOKEN = "7694451864:AAERgoIGkyEeBUvoXgNoKfTiQHVZrQ2mfwc";

const handler: Handler = async () => {
  try {
    const { data } = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`
    );
    return {
      statusCode: 200,
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
