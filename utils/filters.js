const { DateTime } = require("luxon");
const blocklist = require("../src/_data/webmentionsBlocklist.json");

module.exports = {
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
  },

  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: "utc" }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  formatJobDate: function (date) {
    return DateTime.fromFormat(date, "MMMM y").toFormat("y-MM");
  },

  getVarFromString: function (varName) {
    return this.getVariables()[varName];
  },

  getWebmentionsByType: (mentions, mentionType) => {
    return mentions.filter((entry) =>
      mentionType.split(", ").includes(entry["wm-property"])
    );
  },

  getWebmentionsForUrl(webmentions, url) {
    const checkBlocklist = (entry) => {
      const urlParts = new URL(entry.url).hostname.split(".");
      const hostname = urlParts
        .slice(0)
        .slice(-(urlParts.length === 4 ? 3 : 2))
        .join(".");

      return !blocklist.includes(hostname);
    };

    const hasRequiredFields = (entry) => {
      const { author, published, content } = entry;
      return author.name && published && content;
    };

    return webmentions.children
      .filter((entry) => entry["wm-target"] === url)
      .filter(hasRequiredFields)
      .filter(checkBlocklist);
  },

  getWebmentionsSize: (mentions) => {
    return !mentions ? 0 : mentions.length;
  },

  icon: (name) => {
    return `/src/assets/icons/${name}.svg`;
  },

  limit: (array, limit) => {
    return array.slice(0, limit);
  },

  obfuscate: function (str) {
    const chars = [];
    for (var i = str.length - 1; i >= 0; i--) {
      chars.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
    }
    return chars.join("");
  },

  postDate: (dateObj, format) =>
    DateTime.fromJSDate(dateObj).toLocaleString(format || DateTime.DATE_MED),

  removeHttp: (url) => {
    return url.replace(/^https?:\/\//, "");
  },
};
