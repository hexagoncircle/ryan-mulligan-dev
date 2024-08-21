const ordinal = (n) => {
  var s = ["th", "st", "nd", "rd"];
  var v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

const postDate = (dateObj, options) => {
  return new Intl.DateTimeFormat(
    "en-US",
    options || {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "utc",
    }
  ).format(dateObj);
};

const getDeployDate = () => {
  let zone = "America/Los_Angeles";
  let d = new Date(new Date().toLocaleString("en-US", { timeZone: zone }));
  let day = d.getDate();
  let hour = d.getHours();
  let month = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: zone }).format(d);

  let date = `${month} ${ordinal(day)}`;
  let timeOfDay = (hour < 12 && "morning") || (hour < 18 && "afternoon") || "evening";

  return {
    timeOfDay,
    date,
  };
};

export default {
  postDate,
  getDeployDate,
};
