const dates = require("./dates");
const text = require("./text");
const pluralize = require("../pluralize");
const meta = require("../../src/_data/meta");

const getVarFromString = (varName) => {
  return this.getVariables()[varName];
};

const getIcon = (name) => {
  return `/src/assets/icons/${name}.svg`;
};

const limit = (array, limit) => array.slice(0, limit);

const obfuscate = (str) => {
  const chars = [];
  for (var i = str.length - 1; i >= 0; i--) {
    chars.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
  }
  return chars.join("");
};

const isExternalUrl = (str) => {
  try {
    let url = new URL(str);
    return url.host !== meta.domain;
  } catch (err) {
    return false;
  }
};

const readingTime = (content) => {
  const arr = content.split(" ");
  const count = arr.length;
  const wpm = 225;
  const time = Math.ceil(count / wpm);

  return pluralize(time, "minute", "minutes");
};

const removeHttp = (url) => url.replace(/^https?:\/\//, "");

const truncateAfterWord = (str, max) => {
  if (str.length <= max) return str;
  return str.substr(0, str.lastIndexOf(" ", max)) + "...";
};

const filters = {
  ...dates,
  ...text,
  getVarFromString,
  getIcon,
  isExternalUrl,
  limit,
  obfuscate,
  readingTime,
  removeHttp,
  truncateAfterWord,
};

module.exports = (eleventyConfig) => {
  return Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });
};
