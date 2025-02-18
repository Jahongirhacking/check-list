import { Handler } from "@netlify/functions";
import axios from "axios";
import { GITHUB_GISTS_URL, GITHUB_TOKEN } from "../utils/config";

const handler: Handler = async (event) => {
  try {
    const { userId } = JSON.parse(event.body);
    const { data } = await axios.get(GITHUB_GISTS_URL, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

    console.log(data, userId);

    const gist = data.find((gist) => gist.files[`${userId}.json`]);

    if (!gist) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "not found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(gist),
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
