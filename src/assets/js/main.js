document.querySelectorAll("img").forEach((img) => {
  if (img.complete) {
    img.removeAttribute("data-is-loading");
    return;
  }
  img.addEventListener("load", () => img.removeAttribute("data-is-loading"));
});
