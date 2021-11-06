const images = document.querySelectorAll("img");
const slider = document.querySelector(".theme-slider");

images.forEach((img) => {
  img.addEventListener("load", (event) => {
    event.target.removeAttribute("data-is-loading");
  });
});

document.documentElement.removeAttribute("data-no-js");
slider.value = document.documentElement.dataset.theme;

slider.addEventListener("input", () => {
  document.documentElement.dataset.theme = slider.value;
  localStorage.setItem("theme", slider.value);
});
