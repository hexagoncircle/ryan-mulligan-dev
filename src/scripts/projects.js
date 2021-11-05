const getAllFocusableElements = (element) => {
  return element.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
  );
};

const enableFocusableChildren = (enabled, element) => {
  const children = getAllFocusableElements(element);

  if (enabled) {
    element.setAttribute(
      "aria-label",
      "Press the up arrow or escape key to exit this list."
    );
    element.removeAttribute("tabIndex");
    [...children].forEach((child) => child.removeAttribute("tabIndex"));
  } else {
    element.setAttribute(
      "aria-label",
      "CodePen projects. Press the down arrow or enter key to navigate this collection of links."
    );
    element.setAttribute("tabIndex", 0);
    [...children].forEach((child, index) => child.setAttribute("tabIndex", -1));
  }
};

const handleKeyPress = (event, element) => {
  const focusableElements = getAllFocusableElements(element);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (event.key === "ArrowDown" || event.key === "Enter") {
    event.preventDefault();
    enableFocusableChildren(true, element);
    getAllFocusableElements(element)[0].focus();
    return;
  }

  if (event.key === "ArrowUp" || event.key === "Escape") {
    event.preventDefault();
    enableFocusableChildren(false, element);
    element.focus();
    return;
  }

  if (event.key === "Tab") {
    if (document.activeElement === lastFocusableElement) {
      setTimeout(() => enableFocusableChildren(false, element));
    }
  }

  if (event.key === "Tab" && event.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      setTimeout(() => enableFocusableChildren(false, element));
    }
  }
};

const init = (element) => {
  enableFocusableChildren(false, element);
  element.addEventListener("keydown", (event) => {
    handleKeyPress(event, element);
  });
};

const carousel = document.querySelector("[data-carousel]");

document.addEventListener("click", (event) => {
  if (!carousel.contains(event.target)) {
    enableFocusableChildren(false, carousel);
  }
});

init(carousel);
