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
  return DateTime.fromJSDate(dateObj).toLocaleString(format || DateTime.DATE_FULL);
};

const formatJobDate = (date) => {
  return DateTime.fromFormat(date, "MMMM y").toFormat("y-MM");
};

const getDeployDate = () => {
  let d = new Date();
  let hour = d.getHours();
  let timeOfDay = (hour < 12 && "morning") || (hour < 18 && "afternoon") || "evening";
  let date = DateTime.fromJSDate(d, { zone: "America/Los_Angeles" }).toFormat(String("MMMM d"));

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
