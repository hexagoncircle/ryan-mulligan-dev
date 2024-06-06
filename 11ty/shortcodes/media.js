import Image, { generateHTML } from "@11ty/eleventy-img";
import config from "../image.js";

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
    ...config,
    widths,
    formats,
    outputDir: "_site/images",
    urlPath: "/images",
  });

  let imageAttributes = {
    alt,
    sizes,
    ...attrs,
  };

  function wrapFigure(output, caption) {
    return `<figure>${output}<figcaption>${caption}</figcaption></figure>`;
  }

  const pictureOutput = generateHTML(metadata, imageAttributes);

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

export { image, video };
