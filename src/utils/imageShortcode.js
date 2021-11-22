const path = require("path");
const Image = require("@11ty/eleventy-img");

function wrapFigure(output, caption) {
  return `<figure>${output}<figcaption>${caption}</figcaption></figure>`;
}

function generateHTML(metadata, imageAttributes) {
  // use the lower resolution width, height and url for the img
  let lowsrc = metadata.jpeg[0];

  return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(", ")}" sizes="${imageAttributes.sizes}">`;
      })
      .join("\n")}
      <img
        src="${lowsrc.url}"
        width="${lowsrc.width}"
        height="${lowsrc.height}"
        alt="${imageAttributes.alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

async function imageShortcode(src, alt, caption = "") {
  const metadata = await Image(src, {
    widths: [320, 640, 1280],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);

      return `${name}-${width}w.${format}`;
    },
  });

  const imageAttributes = {
    alt,
    sizes: "(min-width: 600px) 100vw",
    loading: "lazy",
    decoding: "async",
  };

  const pictureOutput = generateHTML(metadata, imageAttributes);

  return caption ? wrapFigure(pictureOutput, caption) : pictureOutput;
}

module.exports = imageShortcode;
