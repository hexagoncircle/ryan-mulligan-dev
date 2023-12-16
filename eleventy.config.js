const pluginBundler = require("@11ty/eleventy-plugin-bundle");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const bundlerConfig = require("./11ty/bundler");
const imageConfig = require("./11ty/image");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginBundler, bundlerConfig);
  eleventyConfig.addPlugin(eleventyImagePlugin, imageConfig);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginWebc, {
    components: ["src/_includes/**/*.webc", "npm:@11ty/eleventy-img/*.webc"],
  });
  eleventyConfig.addPlugin(require("./11ty/css"));
  eleventyConfig.addPlugin(require("./11ty/filters"));
  eleventyConfig.addPlugin(require("./11ty/markdown"));
  eleventyConfig.addPlugin(require("./11ty/shortcodes"));

  eleventyConfig.addLayoutAlias("base", "base.webc");
  eleventyConfig.addLayoutAlias("post", "post.webc");

  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "node_modules/@11ty/is-land/is-land.js": "js/is-land.js" });

  eleventyConfig.setServerOptions({
    showAllHosts: false,
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
