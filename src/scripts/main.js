const images = document.querySelectorAll("img");
const slider = document.querySelector(".theme-slider");

images.forEach((img) => {
  if (img.complete) {
    img.removeAttribute("data-is-loading");
    return;
  }
  img.addEventListener("load", () => img.removeAttribute("data-is-loading"));
});

document.documentElement.removeAttribute("data-no-js");
slider.value = document.documentElement.dataset.theme;

slider.addEventListener("input", () => {
  document.documentElement.dataset.theme = slider.value;
  localStorage.setItem("theme", slider.value);
});
