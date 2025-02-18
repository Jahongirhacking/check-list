import { Handler } from "@netlify/functions";
import axios from "axios";

import { GITHUB_GISTS_URL, GITHUB_TOKEN } from "../utils/config";

const handler: Handler = async (event) => {
  try {
    const { userId, firstname, lastname, tasks } = JSON.parse(event.body);
    const { data } = await axios.post(
      GITHUB_GISTS_URL,
      {
        description: `${firstname} ${lastname}'s checklist`,
        public: false,
        files: {
          [`${userId}.json`]: {
            content: JSON.stringify(tasks, null, 2),
          },
        },
      },
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
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
