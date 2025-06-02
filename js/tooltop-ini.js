// tooltip-init.js
import { tooltipText } from './tooltips-data.js';

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tooltip-id]").forEach(el => {
    const tooltipId = el.getAttribute("data-tooltip-id");
    const entry = tooltipText[tooltipId];
    if (!entry || typeof entry !== "object" || !entry.levels) return;

    el.addEventListener("mouseenter", () => {
      const currentLevel = el.getAttribute("data-level") || "1";

      // Find closest defined level if exact doesn't exist
      const availableLevels = Object.keys(entry.levels).map(Number).sort((a, b) => a - b);
      let closestLevel = availableLevels[0];
      for (let lvl of availableLevels) {
        if (lvl <= Number(currentLevel)) {
          closestLevel = lvl;
        } else {
          break;
        }
      }

      const levelText = entry.levels[closestLevel] || "N/A";
      const tooltipContent = `${levelText}`;

      let existing = document.getElementById(`tooltip-${tooltipId}`);
      if (existing) existing.remove();

      const tooltipDiv = document.createElement("div");
      tooltipDiv.id = `tooltip-${tooltipId}`;
      tooltipDiv.className = "custom-tooltip show";
      tooltipDiv.textContent = tooltipContent;
      document.body.appendChild(tooltipDiv);
      positionTooltip(el, tooltipDiv);
      el.setAttribute("aria-describedby", tooltipDiv.id);
    });

    el.addEventListener("mouseleave", () => {
      const tip = document.getElementById(`tooltip-${tooltipId}`);
      if (tip) tip.remove();
      el.removeAttribute("aria-describedby");
    });
  });

  const levelToggle = document.getElementById("max-link-level");
  if (levelToggle) {
    levelToggle.addEventListener("change", () => {
      const activeTooltip = document.querySelector(".custom-tooltip.show");
      if (activeTooltip) {
        activeTooltip.remove();
      }
    });
  }
});

function positionTooltip(trigger, tooltip) {
  const rect = trigger.getBoundingClientRect();
  const tooltipHeight = tooltip.offsetHeight;
  const tooltipWidth = tooltip.offsetWidth;
  const margin = 10;

  const fitsAbove = rect.top >= tooltipHeight + margin;
  const fitsRight = window.innerWidth - rect.right >= tooltipWidth + margin;
  const fitsBelow = window.innerHeight - rect.bottom >= tooltipHeight + margin;

  let top, left;
  tooltip.classList.remove("tooltip-top", "tooltip-right", "tooltip-bottom");

  if (fitsAbove) {
    top = rect.top + window.scrollY - tooltipHeight - margin;
    left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2);
    tooltip.classList.add("tooltip-top");
  } else if (fitsRight) {
    top = rect.top + window.scrollY + (rect.height / 2) - (tooltipHeight / 2);
    left = rect.right + window.scrollX + margin;
    tooltip.classList.add("tooltip-right");
  } else if (fitsBelow) {
    top = rect.bottom + window.scrollY + margin;
    left = rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2);
    tooltip.classList.add("tooltip-bottom");
  } else {
    // fallback: place in center if no space anywhere
    top = rect.top + window.scrollY;
    left = rect.left + window.scrollX;
  }

  // horizontal boundary correction
  if (left < 10) left = 10;
  if (left + tooltipWidth > window.innerWidth) {
    left = window.innerWidth - tooltipWidth - 10;
  }

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}