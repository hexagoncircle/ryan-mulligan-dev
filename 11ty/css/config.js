import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

/**
 * Shared Lightning CSS configuration
 * {@link https://lightningcss.dev/docs.html}
 */
let mixins = new Map();

const minify = process.env.CONTEXT === "production" ? true : false;
const sourceMap = false;
const targets = browserslistToTargets(browserslist("> 0.2% and not dead"));
const drafts = {
  nesting: true,
  customMedia: true,
};
const customAtRules = {
  mixin: {
    prelude: "<custom-ident>",
    body: "style-block",
  },
  apply: {
    prelude: "<custom-ident>",
  },
};
const visitor = {
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
};

export default {
  minify,
  sourceMap,
  targets,
  drafts,
  customAtRules,
  visitor,
};
