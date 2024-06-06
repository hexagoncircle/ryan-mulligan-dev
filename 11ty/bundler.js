import { minify } from "terser";
import { transform } from "lightningcss";
import lightningcssConfig from "./css/config.js";

/**
 * Modify page bundle output
 * {@link https://github.com/11ty/eleventy-plugin-bundle#modify-the-bundle-output}
 */
export default [
  async function (content) {
    if (this.type === "css") {
      let { code } = transform({
        code: Buffer.from(content),
        ...lightningcssConfig,
      });

      return code;
    }

    if (this.type === "js" && process.env.CONTEXT === "production") {
      const minified = await minify(content);
      return minified.code;
    }

    return content;
  },
];
