const { DateTime } = require("luxon");

const dateToFormat = (date, format) => {
  return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String(format));
};

const dateToISO = (date) => {
  return DateTime.fromJSDate(date, { zone: "utc" }).toISO({
    includeOffset: false,
    suppressMilliseconds: true,
  });
};

const postDate = (dateObj, format) => {
  return DateTime.fromJSDate(dateObj).toLocaleString(
    format || DateTime.DATE_FULL
  );
};

const formatJobDate = (date) => {
  return DateTime.fromFormat(date, "MMMM y").toFormat("y-MM");
};

const formatDeployDate = (date) => {
  return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(String("MMMM d"));
};

module.exports = {
  dateToFormat,
  dateToISO,
  postDate,
  formatJobDate,
  formatDeployDate,
};
