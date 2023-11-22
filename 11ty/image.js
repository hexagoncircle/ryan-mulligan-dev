/**
 * Eleventy Image configuration
 * {@link https://www.11ty.dev/docs/plugins/image/}
 */
module.exports = {
  formats: ["webp", "jpeg"],
  urlPath: "/images/",
  defaultAttributes: {
    loading: "lazy",
    decoding: "async",
  },
};
