import { parse } from "path";
import { bundle } from "lightningcss";
import lightningcssConfig from "./config.js";

/**
 * Process CSS files with Lightning CSS
 * {@link https://11ty.rocks/posts/process-css-with-lightningcss/#process-with-lightningcss-only-no-sass}
 */
export default (eleventyConfig) => {
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (_inputContent, inputPath) {
      let parsed = parse(inputPath);

      if (parsed.name.startsWith("_")) return;

      return async () => {
        let { code } = await bundle({
          filename: inputPath,
          ...lightningcssConfig,
        });

        return code;
      };
    },
  });
};
