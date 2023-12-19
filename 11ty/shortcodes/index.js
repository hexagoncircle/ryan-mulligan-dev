const codepen = require("./codepen");
const media = require("./media");
const meta = require("../../src/_data/meta.js");

const metaTitle = (title) => title || meta.title;
const metaDescription = (description) => description || meta.description;
const metaOGImage = (source) => meta.url + (source || meta.ogImage);

const mailToPath = (subject) => {
  if (!subject) {
    subject = "You are wonderful and I had to tell you";
  }
  return `&#109;a&#105;lto&#58;&#104;%65y&#64;%72%79&#37;61%6E&#37;6D%75&#37;&#54;Clig%61&#110;&#46;&#100;&#101;v?subject=${subject}`;
};

const shortcodes = {
  ...codepen,
  ...media,
  metaTitle,
  metaDescription,
  metaOGImage,
  mailToPath,
};

module.exports = (eleventyConfig) => {
  return Object.keys(shortcodes).forEach((shortcode) => {
    eleventyConfig.addShortcode(shortcode, shortcodes[shortcode]);
  });
};
