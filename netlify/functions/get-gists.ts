import { Handler } from "@netlify/functions";
import axios from "axios";
import { GITHUB_GISTS_URL, GITHUB_TOKEN } from "../utils/config";

const handler: Handler = async () => {
  try {
    const { data } = await axios.get(GITHUB_GISTS_URL, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

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
