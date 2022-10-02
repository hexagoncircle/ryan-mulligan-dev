const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginTimeToRead = require("eleventy-plugin-time-to-read");
const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

const filters = require("./utils/filters.js");
const transforms = require("./utils/transforms.js");
const shortcodes = require("./utils/shortcodes.js");
const fetchCodePenScreenshots = require("./utils/codepen-screenshots.js");

module.exports = function (eleventyConfig) {
  fetchCodePenScreenshots();

  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    })
  );
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAttrs));

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginTimeToRead);
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      build: {
        assetsInlineLimit: 0,
        assetsInclude: ["**/*.xml"],
      },
    },
  });

  Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });

  Object.keys(transforms).forEach((transform) => {
    eleventyConfig.addTransform(transform, transforms[transform]);
  });

  Object.keys(shortcodes).forEach((shortcode) => {
    if (shortcode === "image") {
      eleventyConfig.addNunjucksAsyncShortcode(
        shortcode,
        shortcodes[shortcode]
      );
      return;
    }
    eleventyConfig.addShortcode(shortcode, shortcodes[shortcode]);
  });

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("public/favicon");
  eleventyConfig.addPassthroughCopy("public/social");
  eleventyConfig.addPassthroughCopy("public/site.webmanifest");

  // Server options
  eleventyConfig.setServerOptions({
    showAllHosts: false,
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  };
};
