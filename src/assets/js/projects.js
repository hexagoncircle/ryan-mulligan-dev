(function () {
  const projectList = document.querySelector(".projects");
  const projects = [...projectList.querySelectorAll("a")];
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const cls = {
    activeList: "active",
    currentProject: "current",
  };
  let focusedProjectIndex = 0;

  const toggleProjectFocusClass = () => {
    projects.forEach((p) => p.parentNode.classList.remove(cls.currentProject));
    projects[focusedProjectIndex].parentNode.classList.add(cls.currentProject);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Tab") {
      projectList.classList.remove(cls.activeList);
    }

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
        inline: "center",
      });
      selected.focus({ preventScroll: true });
      projectList.classList.add(cls.activeList);
      toggleProjectFocusClass();
      setProjectTabIndex();
    }
  };

  const handleProjectHover = (project) => {
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
  };

  const setProjectTabIndex = () => {
    appendFocusText();
    projects.forEach((p) => {
      if (p === projects[focusedProjectIndex]) {
        p.setAttribute("tabIndex", 0);
      } else {
        p.setAttribute("tabIndex", -1);
      }
    });
  };

  const appendFocusText = () => {
    const text = document.getElementById("projects-focus-text");
    projects[focusedProjectIndex].parentNode.appendChild(text);
  };

  const initFocusTextElement = () => {
    const template = document.getElementById("projects-focus-text-template");
    const content = template.content.cloneNode(true);

    projects[focusedProjectIndex].append(content);
  };

  const initProjectList = () => {
    initFocusTextElement();
    setProjectTabIndex();
    toggleProjectFocusClass();
    !reducedMotion && projects.forEach((p) => handleProjectHover(p));
    projectList.addEventListener("keydown", (e) => handleKeyPress(e));

    document.addEventListener("click", (e) => {
      if (!projectList.contains(e.target)) {
        projectList.classList.remove(cls.activeList);
      }
    });
  };

  initProjectList();
})();
