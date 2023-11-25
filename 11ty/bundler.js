const { minify } = require("terser");
const { transform } = require("lightningcss");
const lightningcssConfig = require("./css/config");

/**
 * Modify page bundle output
 * {@link https://github.com/11ty/eleventy-plugin-bundle#modify-the-bundle-output}
 */
module.exports = {
  transforms: [
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
  ],
};
