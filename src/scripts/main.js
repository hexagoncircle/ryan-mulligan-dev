const images = document.querySelectorAll("img");
const slider = document.querySelector(".theme-slider");

const setThemeValue = (value) => {
  document.documentElement.dataset.theme = value;
  slider.value = value;
};

const getThemeValue = () => {
  if (localStorage.theme) {
    setThemeValue(localStorage.theme);
    return;
  }
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    setThemeValue(5);
  }
};

images.forEach((img) => {
  img.addEventListener("load", (event) => {
    event.target.removeAttribute("data-is-loading");
  });
});

document.documentElement.removeAttribute("data-no-js");

getThemeValue();

slider.addEventListener("input", () => {
  setThemeValue(slider.value);
  localStorage.setItem("theme", slider.value);
});
