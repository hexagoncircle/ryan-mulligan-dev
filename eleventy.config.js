import pluginBundler from "@11ty/eleventy-plugin-bundle";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";
import embeds from "eleventy-plugin-embed-everything";

/** Plugin configuration */
import bundler from "./11ty/bundler.js";
import image from "./11ty/image.js";
import css from "./11ty/css/index.js";
import filters from "./11ty/filters/index.js";
import markdown from "./11ty/markdown.js";
import shortcodes from "./11ty/shortcodes/index.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginBundler, bundler);
  eleventyConfig.addPlugin(eleventyImagePlugin, image);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginWebc, {
    components: ["src/_includes/**/*.webc", "npm:@11ty/eleventy-img/*.webc"],
  });
  eleventyConfig.addPlugin(css);
  eleventyConfig.addPlugin(filters);
  eleventyConfig.addPlugin(markdown);
  eleventyConfig.addPlugin(shortcodes);
  eleventyConfig.addPlugin(embeds);

  eleventyConfig.addLayoutAlias("base", "base.webc");
  eleventyConfig.addLayoutAlias("post", "post.webc");

  eleventyConfig.addPassthroughCopy({ public: "/" });

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
}
