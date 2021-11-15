const markdownIt = require("markdown-it");
const { DateTime } = require("luxon");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const timeToRead = require("eleventy-plugin-time-to-read");

module.exports = function (eleventyConfig) {
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

  eleventyConfig.setLibrary("md", markdownLib);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(timeToRead);
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/scripts/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("./src/manifest.webmanifest");

  eleventyConfig.addShortcode("CodePen", (url, height) => {
    const id = new URL(url).pathname.split("/")[3];

    return `<div class="codepen-wrapper full-bleed" style="height: ${height}"><iframe scrolling="no" title="CodePen Embed" src="https://codepen.io/hexagoncircle/embed/${id}?default-tab=result&theme-id=default&embedded=true" frameborder="0" loading="lazy" allowtransparency="true" allowfullscreen="true"><p><a href="${url}" target="_blank" rel="noopener">See the Pen</a></p></iframe></div>`;
  });

  eleventyConfig.addFilter("postDate", (dateObj) =>
    DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  );

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
