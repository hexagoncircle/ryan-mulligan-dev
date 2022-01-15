(function () {
  const html = document.documentElement;
  const themeControls = document.querySelector("[data-theme-controls]");
  const toggle = themeControls.querySelector(".color-scheme-toggle");
  const slider = themeControls.querySelector(".theme-slider");
  const colorSchemeStatus = themeControls.querySelector(".color-scheme-status");
  const themeStatus = themeControls.querySelector(".theme-status");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  const themeFlavors = [
    "cookies and cream",
    "brambleberry crisp",
    "lemon blueberry parfait",
    "fruit sorbet",
  ];

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") {
      slider.value++;
      setTheme(slider.value);
      updateThemeStatus(slider.value);
    }

    if (e.key === "ArrowLeft") {
      slider.value--;
      setTheme(slider.value);
      updateThemeStatus(slider.value);
    }
  };

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
  };

  const setTheme = (value) => {
    html.dataset.theme = value;
    localStorage.setItem("theme", value);
  };

  const updateColorSchemeStatus = (value) => {
    colorSchemeStatus.innerText = `Color mode is now "${value}"`;
  };

  const updateThemeStatus = (value) => {
    themeStatus.innerText = `Site display set to ${
      themeFlavors[value - 1]
    } theme`;
  };

  const init = () => {
    slider.setAttribute("tabIndex", -1);
    slider.setAttribute("value", html.dataset.theme || 1);
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

  toggle.addEventListener("keydown", (e) => handleKeyPress(e));

  slider.addEventListener("input", () => {
    if (!html.dataset.colorScheme) {
      const scheme = prefersDark.matches ? "dark" : "light";
      setColorScheme(scheme);
      updateColorSchemeStatus(scheme);
    }

    setTheme(slider.value);
    updateThemeStatus(slider.value);
  });

  init();
})();
