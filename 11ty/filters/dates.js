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

const ordinal = (n) => {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const getDeployDate = () => {
  let zone = "America/Los_Angeles";
  let d = new Date();
  let dateObj = DateTime.fromJSDate(d, { zone });
  let day = dateObj.toFormat("d");
  let hour = dateObj.toFormat("H");
  let month = dateObj.toFormat("MMMM");

  let date = `${month} ${ordinal(day)}`;
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
