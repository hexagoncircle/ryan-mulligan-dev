const { DateTime, Settings } = require("luxon");

Settings.defaultZoneName = "America/Los_Angeles";

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
  return DateTime.fromJSDate(dateObj).toLocaleString(format || DateTime.DATE_FULL);
};

const formatJobDate = (date) => {
  return DateTime.fromFormat(date, "MMMM y").toFormat("y-MM");
};

const getDeployDate = () => {
  let zone = "America/Los_Angeles";
  let d = new Date();
  let hour = DateTime.fromJSDate(d, { zone }).toFormat(String("H"));
  let date = DateTime.fromJSDate(d, { zone }).toFormat(String("MMMM d"));
  let timeOfDay = (hour < 12 && "morning") || (hour < 18 && "afternoon") || "evening";

  return {
    timeOfDay,
    date,
  };
};

module.exports = {
  dateToFormat,
  dateToISO,
  postDate,
  formatJobDate,
  getDeployDate,
};
