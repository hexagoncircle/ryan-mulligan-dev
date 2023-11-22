const path = require("path");
const { bundle } = require("lightningcss");
const lightningcssConfig = require("./config");

/**
 * Process CSS files with Lightning CSS
 * {@link https://11ty.rocks/posts/process-css-with-lightningcss/#process-with-lightningcss-only-no-sass}
 */
module.exports = (eleventyConfig) => {
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function (_inputContent, inputPath) {
      let parsed = path.parse(inputPath);

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
