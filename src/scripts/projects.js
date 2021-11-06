const getAllFocusableElements = (el) => {
  return el.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
  );
};

const enableFocusableChildren = (enabled, el) => {
  const children = getAllFocusableElements(el);

  if (enabled) {
    el.removeAttribute("tabIndex");
    [...children].forEach((child) => child.removeAttribute("tabIndex"));
  } else {
    el.setAttribute("tabIndex", 0);
    [...children].forEach((child) => child.setAttribute("tabIndex", -1));
  }
};

const handleKeyPress = (e, el) => {
  const focusableElements = getAllFocusableElements(el);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (e.key === "ArrowDown" || e.key === "Enter") {
    e.preventDefault();
    enableFocusableChildren(true, el);
    getAllFocusableElements(el)[0].focus();
    return;
  }

  if (e.key === "ArrowUp" || e.key === "Escape") {
    e.preventDefault();
    enableFocusableChildren(false, el);
    el.focus();
    return;
  }

  if (e.key === "Tab") {
    if (document.activeElement === lastFocusableElement) {
      setTimeout(() => enableFocusableChildren(false, el));
    }
  }

  if (e.key === "Tab" && e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      setTimeout(() => enableFocusableChildren(false, el));
    }
  }
};

const init = (el) => {
  el.setAttribute(
    "aria-label",
    "CodePen projects. Press down arrow or enter key to navigate this collection of links."
  );
  enableFocusableChildren(false, el);
  el.addEventListener("keydown", (e) => {
    handleKeyPress(e, el);
  });
};

const projectsContainer = document.querySelector(".projects");
const projects = projectsContainer.querySelectorAll(".item");

document.addEventListener("click", (e) => {
  if (!projectsContainer.contains(e.target)) {
    enableFocusableChildren(false, projectsContainer);
  }
});

projects.forEach((project) => {
  project.addEventListener("mousemove", (e) => {
    const r = project.getBoundingClientRect();

    project.style.setProperty(
      "--x",
      e.clientX - (r.left + Math.floor(r.width / 2))
    );
    project.style.setProperty(
      "--y",
      e.clientY - (r.top + Math.floor(r.height / 2))
    );
  });

  project.addEventListener("mouseleave", () => {
    project.style.setProperty("--x", 0);
    project.style.setProperty("--y", 0);
  });
});

init(container);
