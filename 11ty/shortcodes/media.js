const Image = require("@11ty/eleventy-img");

const image = async (
  src,
  alt,
  caption,
  attrs = {},
  widths = [100, 400, 800, 1280],
  formats = ["webp", "jpeg"],
  sizes = "100vw"
) => {
  let metadata = await Image(src, {
    widths,
    formats,
    outputDir: "_site/images",
    urlPath: "/images",
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
    ...attrs,
  };

  function wrapFigure(output, caption) {
    return `<figure>${output}<figcaption>${caption}</figcaption></figure>`;
  }

  const pictureOutput = Image.generateHTML(metadata, imageAttributes);

  return caption ? wrapFigure(pictureOutput, caption) : pictureOutput;
};

const video = (src, caption) => {
  const html = `
    <video preload="metadata" loop muted playsinline controls>
      <source src="${src}.webm#t=0.001" type="video/webm">
      <source src="${src}.mp4#t=0.001" type="video/mp4">
      <p>Your browser cannot play the provided video file.</p>
    </video>
  `;

  if (caption) {
    return `<figure class="video">${html}<figcaption>${caption}</figcaption></figure>`;
  }

  return html;
};

module.exports = {
  image,
  video,
};
