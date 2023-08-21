const Image = require("@11ty/eleventy-img");
const path = require("path");

const sharedImageMetadata = {
  outputDir: "_site/assets/images",
  urlPath: "/assets/images",
};

module.exports = {
  codepen: (url, defaultTab = "result", height = 600, preview = false) => {
    const base = "https://codepen.io";
    const pathname = new URL(url).pathname.split("/");
    const user = pathname[1];
    const hash = pathname[pathname.length - 1];

    return `
<p class="codepen" data-height="${height}" data-preview="${preview}" data-default-tab="${defaultTab}" data-slug-hash="${hash}" data-user="${user}" class="codepen">
  <span><a href="${url}">See the pen</a> (<a href="${base}/${user}">@${user}</a>) on <a href="${base}">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    `;
  },

  codepenImage: async function (id, attrs = {}) {
    const url = `https://shots.codepen.io/hexagoncircle/pen/${id}-1280.jpg`;

    let metadata = await Image(url, {
      widths: [800],
      ...sharedImageMetadata,
      cacheOptions: {
        duration: "2w",
        directory: ".cache",
        removeUrlQueryParams: false,
      },
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension).split("-")[0];
        return `codepen-${name}.${format}`;
      },
    });

    let imageAttributes = {
      alt: "",
      decoding: "async",
      "data-is-loading": true,
      ...attrs,
    };

    return Image.generateHTML(metadata, imageAttributes);
  },

  image: async function (
    src,
    alt,
    caption,
    attrs = {},
    widths = [100, 400, 800, 1280],
    formats = ["webp", "jpeg"],
    sizes = "100vw"
  ) {
    let metadata = await Image(src, {
      widths,
      formats,
      ...sharedImageMetadata,
    });

    let imageAttributes = {
      alt,
      class: "image",
      sizes,
      loading: "lazy",
      decoding: "async",
      ...attrs,
    };

    function wrapFigure(output, caption) {
      return `<figure class="image">${output}<figcaption>${caption}</figcaption></figure>`;
    }

    const pictureOutput = Image.generateHTML(metadata, imageAttributes);

    return caption ? wrapFigure(pictureOutput, caption) : pictureOutput;
  },

  mailToPath: (subject) => {
    if (!subject) {
      subject = "You are wonderful and I had to tell you";
    }
    return `&#109;a&#105;lto&#58;&#104;%65y&#64;%72%79&#37;61%6E&#37;6D%75&#37;&#54;Clig%61&#110;&#46;&#100;&#101;v?subject=${subject}`;
  },

  video: (src, caption) => {
    const html = `
      <video loop muted playsinline controls>
        <source src="${src}.webm" type="video/webm">
        <source src="${src}.mp4" type="video/mp4">
      </video>
    `;

    if (caption) {
      return `<figure class="video">${html}<figcaption>${caption}</figcaption></figure>`;
    }

    return html;
  },

  year: () => new Date().getFullYear(),
};
