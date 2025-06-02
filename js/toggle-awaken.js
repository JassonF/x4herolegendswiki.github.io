// toggle-awaken-visual.js
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("toggle-awaken");
  const awakenDiv = document.getElementById("awaken");
  const aIcon = document.querySelector(".z-awaken-icon");
  const exIcon = document.querySelector(".dokkan-awaken-icon");

  function updateAwakeningView() {
    const showAwaken = checkbox.checked;

    // Mostrar u ocultar el bloque del despertar intermedio
    awakenDiv.classList.toggle("hidden", !showAwaken);

    // Mostrar u ocultar las imágenes según estado
    aIcon.classList.toggle("hidden", !showAwaken);
    exIcon.classList.toggle("hidden", showAwaken);
  }

  checkbox.addEventListener("change", updateAwakeningView);
  updateAwakeningView(); // inicializa en el estado correcto al cargar
});
