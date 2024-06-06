import { transform } from "lightningcss";
import lightningcssConfig from "../../11ty/css/config.js";
import { createRequire } from "module";

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

  [data-appearance="dark"] {
    ${getThemeVars("dark")}
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
