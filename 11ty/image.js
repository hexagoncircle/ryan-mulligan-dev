/**
 * Eleventy Image configuration
 * {@link https://www.11ty.dev/docs/plugins/image/}
 */
export default {
  formats: ["webp", "jpeg"],
  urlPath: "/images/",
  defaultAttributes: {
    loading: "lazy",
    decoding: "async",
  },
};
