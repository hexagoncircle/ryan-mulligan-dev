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

  eleventyConfig.addShortcode(
    "mailToPath",
    () =>
      "&#109;a&#105;lto&#58;&#104;%65y&#64;%72%79&#37;61%6E&#37;6D%75&#37;&#54;Clig%61&#110;&#46;&#100;&#101;v?subject=You are wonderful and I had to tell you"
  );

  return {
    dir: {
      input: "src",
    },
  };
};
