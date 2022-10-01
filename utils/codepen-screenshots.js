const path = require("path");
const Image = require("@11ty/eleventy-img");
const codePens = require("../src/_data/codePen.json");

module.exports = function () {
  codePens.forEach(({ id }) => {
    (async () => {
      let url = `https://shots.codepen.io/hexagoncircle/pen/${id}-1280.jpg`;

      await Image(url, {
        widths: [800],
        outputDir: "_site/assets/images",
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
    })();
  });
};
