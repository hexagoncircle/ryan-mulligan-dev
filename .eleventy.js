const { EleventyRenderPlugin } = require("@11ty/eleventy");
const markdown = require("markdown-it");
const markdownAttrs = require("markdown-it-attrs");
const markdownContainer = require("markdown-it-container");
const pluginPostCss = require("eleventy-plugin-postcss");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginTimeToRead = require("eleventy-plugin-time-to-read");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginSVGContents = require("eleventy-plugin-svg-contents");

const filters = require("./utils/filters.js");
const shortcodes = require("./utils/shortcodes.js");

require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary(
    "md",
    markdown({
      html: true,
      breaks: true,
      linkify: true,
    })
  );
  eleventyConfig.amendLibrary("md", (library) => {
    library.use(markdownAttrs);
    library.use(markdownContainer, "callout", {
      render: function (tokens, i) {
        return tokens[i].nesting === 1 ? `<aside class="callout">` : `</aside>`;
      },
    });
  });

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginTimeToRead);
  eleventyConfig.addPlugin(pluginPostCss);
  eleventyConfig.addPlugin(pluginSVGContents);
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_includes/components/**/*.webc",
  });

  // Filters
  Object.keys(filters).forEach((filter) => {
    eleventyConfig.addFilter(filter, filters[filter]);
  });

  // Shortcodes
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

  // Passthrough file copy
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({
    "src/assets/site.webmanifest": "/site.webmanifest",
  });

  // Server options
  eleventyConfig.setServerOptions({
    showAllHosts: false,
  });

  return {
    templateFormats: ["webc", "md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: ["njk"],
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
