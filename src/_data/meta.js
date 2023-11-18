module.exports = {
  lang: "en",
  title: "Ryan Mulligan",
  description:
    "Passenger through space and time, front-end web builder & bittersweet songs enthusiast",
  domain: "ryanmulligan.dev",
  url:
    (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ||
    "http://localhost:8080",
  ogImage: "/social/ryan-mulligan-dev.png",
};
