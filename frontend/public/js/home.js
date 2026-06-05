/* home.js — featured inventory teaser (6 random cars) */
(function () {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        const grid = document.getElementById("featured-grid");
        if (!grid || !window.INVENTORY) return;
        // Pick 6 from a curated mix (luxury + popular)
        const picks = [0, 2, 3, 4, 8, 11].map((i) => window.INVENTORY[i]);
        grid.innerHTML = picks.map((c) => `
            <a class="feat-card" href="buy.html#car-${c.id}" data-testid="feat-card-${c.id}">
                <div class="feat-photo">
                    <span class="feat-tag">${c.condition}</span>
                    <img src="${c.photo}" alt="${MA.esc(c.title)}" loading="lazy" />
                </div>
                <div class="feat-body">
                    <span class="feat-year">${c.year} &middot; ${MA.esc(c.exteriorColor)}</span>
                    <h3 class="feat-name">${MA.esc(c.title)}</h3>
                    <div class="feat-foot">
                        <span class="feat-price">${MA.fmt$(c.price)}</span>
                        <span class="feat-cta">View <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </a>
        `).join("");
    });
})();
