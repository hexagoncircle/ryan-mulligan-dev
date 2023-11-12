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
        let { code } = await transform({
          code: Buffer.from(content),
          ...lightningcssConfig,
        });

        return code;
      }

      return content;
    },
  ],
};
