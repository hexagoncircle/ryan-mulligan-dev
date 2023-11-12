const markdown = require("markdown-it");
const markdownAnchor = require("markdown-it-anchor");
const markdownAttrs = require("markdown-it-attrs");
const markdownContainer = require("markdown-it-container");
const slugify = require("@sindresorhus/slugify");

module.exports = (eleventyConfig) => {
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
    library.use(markdownAnchor, {
      level: 2,
      tabIndex: false,
      slugify: (s) => slugify(s),
    });
    library.use(markdownContainer, "callout", {
      render: function (tokens, i) {
        return tokens[i].nesting === 1 ? `<aside class="callout">` : `</aside>`;
      },
    });
  });
};
