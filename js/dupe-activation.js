// dupe-activation.js
function formatStat(value) {
  const parts = value.toLocaleString("en-US").split(",");
  return parts.length > 1
    ? `${parts[0]}<span class="no-copy">,</span>${parts[1]}`
    : parts[0];
}

document.addEventListener("DOMContentLoaded", () => {
  const activationStats = {
    0: { percent: "55%", hp: 9436, atk: 9980, def: 6219 },
    1: { percent: "69%", hp: 10436, atk: 10880, def: 7019 },
    2: { percent: "79%", hp: 11436, atk: 11880, def: 7819 },
    3: { percent: "90%", hp: 12036, atk: 13380, def: 9219 }
  };

  const radios = document.querySelectorAll("input[name='dupe_count']");

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      const stats = activationStats[radio.value];
      if (!stats) return;

      // Actualizar tabla de stats
      const hpCell = document.querySelector(".stat-hp");
      const atkCell = document.querySelector(".stat-atk");
      const defCell = document.querySelector(".stat-def");

      if (hpCell) hpCell.innerHTML = formatStat(stats.hp);
      if (atkCell) atkCell.innerHTML = formatStat(stats.atk);
      if (defCell) defCell.innerHTML = formatStat(stats.def);

      // Actualizar texto dentro del SVG
      const svgText = document.querySelector("#activation-label-svg text");
      if (svgText) {
        svgText.textContent = stats.percent;
      }
    });
  });
});
