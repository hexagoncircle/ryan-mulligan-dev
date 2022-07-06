const markdownIt = require("markdown-it");
const { DateTime } = require("luxon");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const timeToRead = require("eleventy-plugin-time-to-read");
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const imageShortcode = require("./src/utils/imageShortcode.js");
const codepens = require("./src/_data/codePen.json");
const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true,
  };

  codepens.forEach(({ id }) => {
    (async () => {
      let url = `https://shots.codepen.io/hexagoncircle/pen/${id}-1280.jpg`;

      await Image(url, {
        widths: [800],
        outputDir: "_site/img",
        cacheOptions: {
          duration: "2w",
          directory: ".cache",
          removeUrlQueryParams: false,
        },
        filenameFormat: function (id, src, width, format, options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension).split("-")[0];
          return `${name}-${width}w.${format}`;
        },
      });
    })();
  });

  eleventyConfig.setLibrary("md", markdownIt(markdownItOptions));
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAttrs));

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

  eleventyConfig.addNunjucksFilter("camelToKabob", (str) =>
    str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()
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
