(function () {
  const html = document.documentElement;
  const themeControls = document.querySelector("[data-theme-controls]");
  const themeNames = Array.from(themeControls.dataset.themes.split(", "));
  const toggle = themeControls.querySelector(".color-scheme-toggle");
  const slider = themeControls.querySelector(".theme-slider");
  const colorSchemeStatus = themeControls.querySelector(".color-scheme-status");
  const themeStatus = themeControls.querySelector(".theme-status");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const setToggleLabel = () => {
    let mode;

    mode = !html.dataset.colorScheme
      ? prefersDark.matches
        ? "dark"
        : "light"
      : html.dataset.colorScheme;

    toggle.setAttribute(
      "title",
      `Enable ${mode === "dark" ? "light" : "dark"} mode`
    );
  };

  const setColorScheme = (value) => {
    html.dataset.colorScheme = value;
    localStorage.setItem("color-scheme", value);
    setToggleLabel();

    if (!html.dataset.theme) {
      setTheme(0);
    }
  };

  const setTheme = (value) => {
    const theme = themeNames[value];
    html.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    if (!html.dataset.colorScheme) {
      setColorScheme(prefersDark.matches ? "dark" : "light");
    }
  };

  const updateColorSchemeStatus = (value) => {
    colorSchemeStatus.innerText = `Color mode is now "${value}"`;
  };

  const updateThemeStatus = (value) => {
    themeStatus.innerText = `Site display set to ${themeNames[value]} theme`;
  };

  const init = () => {
    slider.setAttribute("tabIndex", -1);
    slider.setAttribute("value", themeNames.indexOf(html.dataset.theme) || 0);
    setToggleLabel();
  };

  toggle.insertAdjacentHTML(
    "beforebegin",
    `<p id="theme-controls-focus-text" class="visually-hidden">
      In addition, use the left and right arrow keys to change the theme
    </p>`
  );

  toggle.setAttribute("aria-describedby", "theme-controls-focus-text");

  toggle.addEventListener("click", () => {
    if (!html.dataset.colorScheme && prefersDark.matches) {
      setColorScheme("light");
      updateColorSchemeStatus("light");
      return;
    }

    const scheme = html.dataset.colorScheme === "dark" ? "light" : "dark";

    setColorScheme(scheme);
    updateColorSchemeStatus(scheme);
  });

  toggle.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      slider.value === slider.max ? (slider.value = 0) : slider.value++;
    }

    if (e.key === "ArrowLeft") {
      slider.value === slider.min
        ? (slider.value = slider.max)
        : slider.value--;
    }

    setTheme(slider.value);
    updateThemeStatus(slider.value);
  });

  slider.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      toggle.focus();
    }
  });

  slider.addEventListener("input", () => {
    setTheme(slider.value);
    updateThemeStatus(slider.value);
  });

  init();
})();
