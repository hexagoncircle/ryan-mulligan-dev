const browserslist = require("browserslist");
const { browserslistToTargets } = require("lightningcss");

/**
 * Shared Lightning CSS configuration
 * {@link https://lightningcss.dev/docs.html}
 */
let mixins = new Map();

module.exports = {
  minify: process.env.URL ? true : false,
  sourceMap: false,
  targets: browserslistToTargets(browserslist("> 0.2% and not dead")),
  drafts: {
    nesting: true,
    customMedia: true,
  },
  customAtRules: {
    mixin: {
      prelude: "<custom-ident>",
      body: "style-block",
    },
    apply: {
      prelude: "<custom-ident>",
    },
  },
  visitor: {
    Rule: {
      custom: {
        mixin(rule) {
          mixins.set(rule.prelude.value, rule.body.value);
          return [];
        },
        apply(rule) {
          return mixins.get(rule.prelude.value);
        },
      },
    },
  },
};
