const Image = require("@11ty/eleventy-img");
const path = require("path");

const codepen = (url, defaultTab = "result", height = 600, preview = false) => {
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
};

const codepenImage = async (id, attrs = {}) => {
  const url = `https://shots.codepen.io/hexagoncircle/pen/${id}-1280.jpg?version=1`;

  let metadata = await Image(url, {
    widths: [640, 1280],
    outputDir: "_site/images",
    urlPath: "/images",
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
    sizes: "100vw",
    loading: "lazy",
    decoding: "async",
    "data-is-loading": true,
    ...attrs,
  };

  return Image.generateHTML(metadata, imageAttributes);
};

module.exports = {
  codepen,
  codepenImage,
};
