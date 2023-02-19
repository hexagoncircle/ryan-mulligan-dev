const { DateTime } = require("luxon");

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
