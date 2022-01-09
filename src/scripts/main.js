const root = document.documentElement;
const images = document.querySelectorAll("img");
const modeToggle = document.getElementById("toggle-color-scheme");
const modeToggleStatus = document.getElementById("color-scheme-status");
const modeToggleText = modeToggle.querySelector(".label");
const slider = document.querySelector(".theme-slider");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const setModeToggleText = () => {
  let mode;

  if (!root.dataset.colorScheme) {
    mode = prefersDark.matches ? "dark" : "light";
  } else {
    mode = root.dataset.colorScheme;
  }

  modeToggleText.innerText = `Enable ${
    mode === "dark" ? "light" : "dark"
  } mode`;
  modeToggleStatus.innerText = `Color mode is now "${mode}"`;
};

const setColorScheme = (value) => {
  root.dataset.colorScheme = value;
  localStorage.setItem("color-scheme", value);
  setModeToggleText();
};

slider.setAttribute("value", root.dataset.theme || 1);
setModeToggleText();

images.forEach((img) => {
  if (img.complete) {
    img.removeAttribute("data-is-loading");
    return;
  }
  img.addEventListener("load", () => img.removeAttribute("data-is-loading"));
});

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
