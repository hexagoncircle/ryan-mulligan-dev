const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginTimeToRead = require("eleventy-plugin-time-to-read");
const pluginPostCss = require("eleventy-plugin-postcss");

const filters = require("./utils/filters.js");
const transforms = require("./utils/transforms.js");
const shortcodes = require("./utils/shortcodes.js");

module.exports = function (eleventyConfig) {
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
  eleventyConfig.addPlugin(pluginPostCss);

  Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });

  Object.keys(transforms).forEach((transform) => {
    eleventyConfig.addTransform(transform, transforms[transform]);
  });

  Object.keys(shortcodes).forEach((shortcode) => {
    if (shortcodes[shortcode].constructor.name === "AsyncFunction") {
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
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({
    "src/assets/site.webmanifest": "/site.webmanifest",
  });

  // Server options
  eleventyConfig.setServerOptions({
    showAllHosts: false,
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
  };
};
