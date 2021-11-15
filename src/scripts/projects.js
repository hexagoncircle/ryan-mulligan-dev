const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const projectList = document.querySelector(".projects");
const projects = [...projectList.querySelectorAll("a")];
let focusedProjectIndex = -1;

const handleKeyPress = (e) => {
  if (e.key === "ArrowRight") {
    if (focusedProjectIndex === projects.length - 1) {
      focusedProjectIndex = 0;
    } else {
      focusedProjectIndex++;
    }
  }

  if (e.key === "ArrowLeft") {
    if (focusedProjectIndex === 0 || focusedProjectIndex === -1) {
      focusedProjectIndex = projects.length - 1;
    } else {
      focusedProjectIndex--;
    }
  }

  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    const selected = projects[focusedProjectIndex];

    e.preventDefault();
    selected.scrollIntoView({
      block: "nearest",
      inline: "start",
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
    selected.focus({ preventScroll: true });
  }
};

const initProjectList = () => {
  projects.forEach((project) => {
    project.setAttribute("tabIndex", -1);

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

  projectList.setAttribute("tabIndex", 0);
  projectList.addEventListener("keydown", (e) => handleKeyPress(e));
  projectList.insertAdjacentHTML(
    "afterend",
    `<p id="projects-focus-text">Navigate with left and right arrow keys</p>`
  );
  projectList.setAttribute("aria-label", "Links to CodePen projects");
};

initProjectList();
