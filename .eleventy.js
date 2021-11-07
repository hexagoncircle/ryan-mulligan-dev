const markdownIt = require("markdown-it");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  const markdownItAttrs = require("markdown-it-attrs");

  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/scripts/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/manifest.webmanifest");
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("postDate", (dateObj) =>
    DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  );

  return {
    dir: {
      input: "src",
    },
  };
};
