document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("max-link-level");

  checkbox.addEventListener("change", () => {
    const links = document.querySelectorAll(".x4-link-wrapper");

    links.forEach(link => {
      const levelEl = link.querySelector(".level");
      const wrapper = link.querySelector(".x4-link-sm");

      if (checkbox.checked) {
        levelEl.textContent = "10";
        wrapper.classList.add("x4-link-gold");
        link.setAttribute("data-level", "10");
      } else {
        levelEl.textContent = "1";
        wrapper.classList.remove("x4-link-gold");
        link.setAttribute("data-level", "1");
      }
    });
  });
});