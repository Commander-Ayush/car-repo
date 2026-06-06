/* buy.js — filter render, inventory render, sort, vehicle detail modal */
(function () {
    "use strict";
    const { $, $$, fmt$, fmtMi, esc, slug } = window.MA;

    const activeFilters = {
        condition: new Set(),
        exteriorColor: new Set(),
        interiorColor: new Set(),
        drivetrain: new Set(),
        fuelType: new Set(),
        cityMpg: new Set(),
        highwayMpg: new Set(),
        transmission: new Set()
    };
    let activeSort = "featured";

    function injectVehicleModal() {
        if (document.getElementById("modal-vehicle")) return;
        document.body.insertAdjacentHTML("beforeend", `
            <div class="modal" id="modal-vehicle" data-testid="vehicle-modal" aria-hidden="true">
                <div class="modal-backdrop" data-action="close-modal"></div>
                <div class="modal-card wide">
                    <button class="modal-close" data-action="close-modal" data-testid="vehicle-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
                    <div id="vehicle-detail"></div>
                </div>
            </div>
        `);
    }

    function renderFilters() {
        const F = window.FILTERS;
        renderGroup("exteriorColor", F.exteriorColor, withSwatch);
        renderGroup("interiorColor", F.interiorColor, withSwatch);
        renderGroup("drivetrain", F.drivetrain, plain);
        renderGroup("fuelType", F.fuelType, plain);
        renderGroup("cityMpg", F.cityMpg, mpg);
        renderGroup("highwayMpg", F.highwayMpg, mpg);
        renderGroup("transmission", F.transmission, plain);
    }
    function renderGroup(name, options, tpl) {
        const c = document.querySelector(`[data-filter-group="${name}"]`);
        if (c) c.innerHTML = options.map(tpl).join("");
    }
    const withSwatch = (opt) => `
        <label class="check" data-testid="opt-${slug(opt.label)}">
            <input type="checkbox" value="${esc(opt.label)}" />
            <span class="swatch" style="background:${opt.swatch}"></span>
            <span>${esc(opt.label)}</span><em class="count">${opt.count}</em>
        </label>`;
    const plain = (opt) => `
        <label class="check" data-testid="opt-${slug(opt.label)}">
            <input type="checkbox" value="${esc(opt.label)}" />
            <span>${esc(opt.label)}</span><em class="count">${opt.count}</em>
        </label>`;
    const mpg = (opt) => `
        <label class="check" data-testid="opt-mpg-${opt.key}">
            <input type="checkbox" value="${esc(opt.key)}" />
            <span>${esc(opt.label)}</span><em class="count">${opt.count}</em>
        </label>`;

    function inventoryFiltered() {
        return window.INVENTORY.filter((car) => {
            if (activeFilters.condition.size && !activeFilters.condition.has(car.condition)) return false;
            if (activeFilters.exteriorColor.size && !activeFilters.exteriorColor.has(car.exteriorColor)) return false;
            if (activeFilters.interiorColor.size && !activeFilters.interiorColor.has(car.interiorColor)) return false;
            if (activeFilters.drivetrain.size && !activeFilters.drivetrain.has(car.drivetrain)) return false;
            if (activeFilters.fuelType.size && !activeFilters.fuelType.has(car.fuelType)) return false;
            if (activeFilters.transmission.size && !activeFilters.transmission.has(car.transmission)) return false;
            if (activeFilters.cityMpg.size) {
                let ok = false;
                activeFilters.cityMpg.forEach((k) => {
                    if (k === "other" && car.cityMpg < 10) ok = true;
                    else if (k !== "other" && car.cityMpg > Number(k)) ok = true;
                });
                if (!ok) return false;
            }
            if (activeFilters.highwayMpg.size) {
                let ok = false;
                activeFilters.highwayMpg.forEach((k) => {
                    if (k === "other" && car.highwayMpg < 10) ok = true;
                    else if (k !== "other" && car.highwayMpg > Number(k)) ok = true;
                });
                if (!ok) return false;
            }
            return true;
        });
    }
    function sorted(list) {
        const arr = list.slice();
        switch (activeSort) {
            case "price-asc": arr.sort((a, b) => a.price - b.price); break;
            case "price-desc": arr.sort((a, b) => b.price - a.price); break;
            case "year-desc": arr.sort((a, b) => b.year - a.year); break;
            case "mileage-asc": arr.sort((a, b) => a.mileage - b.mileage); break;
        }
        return arr;
    }
    function renderInventory() {
        const grid = $("#inventory-grid"), empty = $("#empty-state");
        const list = sorted(inventoryFiltered());
        $("#result-count").textContent = list.length;
        if (!list.length) { grid.innerHTML = ""; empty.style.display = "block"; return; }
        empty.style.display = "none";

        grid.innerHTML = list.map((c) => `
            <article class="car-card" data-id="${c.id}" id="car-${c.id}" data-testid="car-card-${c.id}">
                <div class="car-photo">
                    <span class="car-tag" data-testid="car-condition-${c.id}">${esc(c.condition)}</span>
                    <img src="${c.photo}" alt="${esc(c.title)}" loading="lazy" />
                </div>
                <div class="car-body">
                    <span class="car-year">${c.year} &middot; ${esc(c.exteriorColor)}</span>
                    <h3 class="car-name">${esc(c.title)}</h3>
                    <div class="car-specs">
                        <span><i class="fa-solid fa-gauge-simple-high"></i>${fmtMi(c.mileage)}</span>
                        <span><i class="fa-solid fa-cogs"></i>${esc(c.drivetrain.split(" ").map(w=>w[0]).join(""))}</span>
                        <span><i class="fa-solid fa-gas-pump"></i>${c.cityMpg}/${c.highwayMpg} MPG</span>
                    </div>
                    <div class="car-foot">
                        <span class="car-price" data-testid="car-price-${c.id}">${fmt$(c.price)}</span>
                        <span class="car-cta">View <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </article>
        `).join("");
    }

    function openVehicle(id) {
        const c = window.INVENTORY.find((v) => v.id === Number(id));
        if (!c) return;
        $("#vehicle-detail").innerHTML = `
            <div class="vd">
                <div class="vd-photo"><img src="${c.photo}" alt="${esc(c.title)}" /></div>
                <div class="vd-body">
                    <span class="small-label">${c.year} &middot; ${esc(c.condition)}</span>
                    <h4>${esc(c.title)}</h4>
                    <p class="vd-price">${fmt$(c.price)}</p>
                    <dl class="vd-table">
                        <dt>Mileage</dt><dd>${fmtMi(c.mileage)}</dd>
                        <dt>Drivetrain</dt><dd>${esc(c.drivetrain)}</dd>
                        <dt>Fuel</dt><dd>${esc(c.fuelType)}</dd>
                        <dt>Transmission</dt><dd>${esc(c.transmission)}</dd>
                        <dt>Exterior</dt><dd>${esc(c.exteriorColor)}</dd>
                        <dt>Interior</dt><dd>${esc(c.interiorColor)}</dd>
                        <dt>City MPG</dt><dd>${c.cityMpg}</dd>
                        <dt>Highway MPG</dt><dd>${c.highwayMpg}</dd>
                        <dt>VIN</dt><dd>${esc(c.vin)}</dd>
                    </dl>
                    <div class="vd-actions">
                        <button class="btn btn-primary" data-action="open-testdrive" data-vehicle="${c.id}" data-testid="vd-testdrive-btn">Book a Test Drive</button>
                        <a href="finance.html" class="btn btn-ghost" data-testid="vd-finance-btn">Finance This</a>
                    </div>
                </div>
            </div>`;
        window.openModal("modal-vehicle");
    }

    document.addEventListener("DOMContentLoaded", () => {
        injectVehicleModal();
        renderFilters();
        renderInventory();

        document.addEventListener("change", (e) => {
            const cb = e.target.closest('.filter-options input[type="checkbox"]');
            if (cb) {
                const group = cb.closest("[data-filter-group]").getAttribute("data-filter-group");
                if (cb.checked) activeFilters[group].add(cb.value); else activeFilters[group].delete(cb.value);
                renderInventory();
            }
            if (e.target.id === "sort-select") {
                activeSort = e.target.value;
                renderInventory();
            }
        });

        document.addEventListener("click", (e) => {
            if (e.target.closest("[data-action='reset-filters']")) {
                Object.keys(activeFilters).forEach((k) => activeFilters[k].clear());
                $$('.filter-options input[type="checkbox"]').forEach((cb) => (cb.checked = false));
                renderInventory();
                return;
            }
            const card = e.target.closest(".car-card");
            if (card) window.location.href = `car-detail.html?id=${card.getAttribute("data-id")}`;
        });

        // Deep link: buy.html#car-12 opens vehicle
        if (location.hash.startsWith("#car-")) {
            const id = location.hash.replace("#car-", "");
            setTimeout(() => openVehicle(id), 200);
        }
    });
})();
