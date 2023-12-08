import fetch from "node-fetch";
import { schedule } from "@netlify/functions";

const handler = schedule("0 0 * * 1,5", async () => {
  await fetch(process.env.SCHEDULED_DEPLOY_BUILD_HOOK_URL, {
    method: "POST",
  }).then((response) => {
    console.log("Build hook response:", response);
  });

  return {
    statusCode: 200,
  };
});

export { handler };
