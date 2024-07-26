import { transform } from "lightningcss";
import lightningcssConfig from "../../11ty/css/config.js";
import { createRequire } from "module";

/**
 * Leverage the cjs require function to import json files
 * {@link https://pawelgrzybek.com/all-you-need-to-know-to-move-from-commonjs-to-ecmascript-modules-esm-in-node-js/#importing-json}
 * {@link https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/}
 */
const require = createRequire(import.meta.url);
const themes = require("../_data/themes.json");

const getThemeVars = (variant) => {
  let result = "";

  function outputVars(theme) {
    let vars = "";

    for (let prop in theme[variant]) {
      vars += `--color-${prop}: ${theme[variant][prop]};`;
    }

    return vars;
  }

  function outputThemeVars(theme) {
    return `[data-theme="${theme.name}"] { 
        ${outputVars(theme)}
      }`;
  }

  themes.map((theme, index) => {
    if (index === 0) {
      result += outputVars(theme);
      result += outputThemeVars(theme);
    } else {
      result += outputThemeVars(theme);
    }
  });

  return result;
};

let css = `
  :root {
    ${getThemeVars("light")}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-appearance]) {
      ${getThemeVars("dark")}
    }
  }

  @media not print {
    [data-appearance="dark"] {
      ${getThemeVars("dark")}
    }
  }
`;

let { code } = transform({
  code: Buffer.from(css),
  ...lightningcssConfig,
});

class Themes {
  data() {
    return {
      permalink: "/css/themes.css",
      code,
    };
  }

  render({ code }) {
    return code;
  }
}

export default Themes;
