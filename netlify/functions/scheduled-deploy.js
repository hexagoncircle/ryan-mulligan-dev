import fetch from "node-fetch";
import { schedule } from "@netlify/functions";

const BUILD_HOOK =
  "https://api.netlify.com/build_hooks/642cf9ebbb1b6847f8cf5470";

const handler = schedule("0 0 * * 1,5", async () => {
  await fetch(BUILD_HOOK, {
    method: "POST",
  }).then((response) => {
    console.log("Build hook response:", response);
  });

  return {
    statusCode: 200,
  };
});

export { handler };
