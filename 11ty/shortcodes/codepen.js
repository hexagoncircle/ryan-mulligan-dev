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

module.exports = {
  codepen,
};
