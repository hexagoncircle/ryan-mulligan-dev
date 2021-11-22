const markdownIt = require("markdown-it");
const { DateTime } = require("luxon");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const timeToRead = require("eleventy-plugin-time-to-read");
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const imageShortcode = require("./src/utils/imageShortcode.js");

module.exports = function (eleventyConfig) {
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(timeToRead);
  eleventyConfig.addPlugin(socialImages);
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/scripts/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/manifest.webmanifest");

  eleventyConfig.addFilter("postDate", (dateObj) =>
    DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  );

  eleventyConfig.addShortcode("image", imageShortcode);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("mailToPath", (subject) => {
    if (!subject) {
      subject = "You are wonderful and I had to tell you";
    }
    return `&#109;a&#105;lto&#58;&#104;%65y&#64;%72%79&#37;61%6E&#37;6D%75&#37;&#54;Clig%61&#110;&#46;&#100;&#101;v?subject=${subject}`;
  });

  return {
    dir: {
      input: "src",
    },
  };
};
