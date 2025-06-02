document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.getElementById("theme-select");

  // Carga inicial
  const savedTheme = localStorage.getItem("theme") || "Auto";
  applyTheme(savedTheme);
  themeSelect.value = savedTheme;

  // Al cambiar el select
  themeSelect.addEventListener("change", () => {
    const selected = themeSelect.value;
    localStorage.setItem("theme", selected);
    applyTheme(selected);
  });
});function applyTheme(theme) {
  document.body.classList.remove("dark");

  if (theme === "Dark") {
    document.body.classList.add("dark");
  } else if (theme === "Light") {
    document.body.classList.add("light-theme");
  } else if (theme === "Auto") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.add(prefersDark ? "dark-theme" : "light-theme");
  }
}