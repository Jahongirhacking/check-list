import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  try {
    const data = event.body;
    console.log(data);
    return {
      statusCode: 200,
      body: data,
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
