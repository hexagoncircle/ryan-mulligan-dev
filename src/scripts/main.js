const root = document.documentElement;
const images = document.querySelectorAll("img");
const modeToggle = document.getElementById("toggle-color-scheme");
const slider = document.querySelector(".theme-slider");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

slider.setAttribute("value", root.dataset.theme || 1);

images.forEach((img) => {
  if (img.complete) {
    img.removeAttribute("data-is-loading");
    return;
  }
  img.addEventListener("load", () => img.removeAttribute("data-is-loading"));
});

const setColorScheme = (value) => {
  root.dataset.colorScheme = value;
  localStorage.setItem("color-scheme", value);
};

modeToggle.addEventListener("click", () => {
  if (!root.dataset.colorScheme && prefersDark.matches) {
    setColorScheme("light");
    return;
  }

  setColorScheme(root.dataset.colorScheme === "dark" ? "light" : "dark");
});

slider.addEventListener("input", () => {
  if (!root.dataset.colorScheme) {
    setColorScheme(prefersDark.matches ? "dark" : "light");
  }

  root.dataset.theme = slider.value;
  localStorage.setItem("theme", slider.value);
});
