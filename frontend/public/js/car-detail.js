/* car-detail.js — full vehicle detail page logic */
(function () {
    "use strict";
    const { fmt$, fmtMi, esc } = window.MA;

    /* ── Read ?id= from URL ── */
    function getCarId() {
        return new URLSearchParams(location.search).get("id");
    }

    /* ── Render the full page with car data ── */
    function renderPage(car) {
        document.title = `${car.title} — Maison Avenir`;

        /* Hero gallery */
        document.getElementById("vd-photo").src = car.photo;
        document.getElementById("vd-photo").alt = car.title;
        document.getElementById("vd-condition").textContent = car.condition;

        /* Info panel */
        document.getElementById("vd-year").textContent = `${car.year} · ${esc(car.make.replace("-", " "))}`;
        document.getElementById("vd-title").textContent = car.title;

        const dot = document.getElementById("vd-color-dot");
        dot.style.background = car.exteriorSwatch || "#ccc";
        document.getElementById("vd-color-text").textContent = car.exteriorColor;

        document.getElementById("vd-price").textContent = fmt$(car.price);

        /* Quick specs */
        document.getElementById("qs-mileage").textContent = fmtMi(car.mileage);
        document.getElementById("qs-drive").textContent = car.drivetrain.split(" ").map(w => w[0]).join("") + "D";
        document.getElementById("qs-mpg").textContent = `${car.cityMpg}/${car.highwayMpg}`;

        /* Wire test drive button vehicle pre-select */
        document.querySelectorAll("[data-action='open-testdrive']").forEach(btn => {
            btn.setAttribute("data-vehicle", car.id);
        });

        /* Full spec table */
        const specMap = {
            "spec-year": car.year,
            "spec-make": car.make.replace("-", " "),
            "spec-model": car.model,
            "spec-condition": car.condition,
            "spec-ext-color": car.exteriorColor,
            "spec-int-color": car.interiorColor,
            "spec-drivetrain": car.drivetrain,
            "spec-transmission": car.transmission,
            "spec-fuel": car.fuelType,
            "spec-city-mpg": `${car.cityMpg} mpg`,
            "spec-hwy-mpg": `${car.highwayMpg} mpg`,
            "spec-mileage": fmtMi(car.mileage),
            "spec-price": fmt$(car.price),
            "spec-vin": car.vin
        };
        Object.entries(specMap).forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });

        /* VIN display for history panel */
        const vinDisplays = document.querySelectorAll(".vin-display");
        vinDisplays.forEach(el => el.textContent = car.vin);

        /* Breadcrumb */
        document.getElementById("crumb-title").textContent = car.title;

        /* Render similar vehicles (same make or similar price) */
        renderSimilar(car);

        /* Fetch NHTSA recalls */
        fetchRecalls(car.make.replace("-", " "), car.model.split(" ")[0], car.year);
    }

    /* ── Similar vehicles ── */
    function renderSimilar(current) {
        const grid = document.getElementById("similar-grid");
        if (!grid || !window.INVENTORY) return;

        const similar = window.INVENTORY
            .filter(c => c.id !== current.id)
            .sort((a, b) => {
                // Prefer same make, then similar price
                const aMake = a.make === current.make ? 2 : 0;
                const bMake = b.make === current.make ? 2 : 0;
                const aPriceDiff = Math.abs(a.price - current.price);
                const bPriceDiff = Math.abs(b.price - current.price);
                return (bMake - aMake) || (aPriceDiff - bPriceDiff);
            })
            .slice(0, 3);

        grid.innerHTML = similar.map(c => `
            <a class="feat-card" href="car-detail.html?id=${c.id}" data-testid="similar-card-${c.id}">
                <div class="feat-photo">
                    <span class="feat-tag">${esc(c.condition)}</span>
                    <img src="${c.photo}" alt="${esc(c.title)}" loading="lazy" />
                </div>
                <div class="feat-body">
                    <span class="feat-year">${c.year} · ${esc(c.exteriorColor)}</span>
                    <h3 class="feat-name">${esc(c.title)}</h3>
                    <div class="feat-foot">
                        <span class="feat-price">${fmt$(c.price)}</span>
                        <span class="feat-cta">View <i class="fa-solid fa-arrow-right"></i></span>
                    </div>
                </div>
            </a>
        `).join("");
    }

    /* ── NHTSA Recalls (free government API, no key needed) ── */
    async function fetchRecalls(make, model, year) {
        const container = document.getElementById("recalls-container");
        if (!container) return;

        container.innerHTML = `<p class="recalls-loading">Checking NHTSA database…</p>`;

        try {
            const url = `https://api.nhtsa.dot.gov/recalls/recallsByVehicle?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&modelYear=${year}`;
            const res = await fetch(url);
            const data = await res.json();
            const recalls = data.results || [];

            if (!recalls.length) {
                container.innerHTML = `
                    <div class="no-recalls">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>No open NHTSA safety recalls found for this vehicle.</span>
                    </div>`;
                return;
            }

            container.innerHTML = `
                <ul class="recall-list">
                    ${recalls.slice(0, 5).map(r => `
                        <li class="recall-item">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                            <div>
                                <strong>${esc(r.Component || "Component not listed")}</strong>
                                <span>${esc(r.Summary ? r.Summary.slice(0, 160) + (r.Summary.length > 160 ? "…" : "") : "No summary available.")}</span>
                            </div>
                        </li>
                    `).join("")}
                </ul>
                ${recalls.length > 5 ? `<p style="margin:14px 0 0;font-size:12px;color:var(--c-ink-3)">${recalls.length - 5} more recall(s) — <a href="https://www.nhtsa.gov/vehicle/${encodeURIComponent(make)}/${encodeURIComponent(model)}/${year}/0" target="_blank" style="color:var(--c-gold)">view on NHTSA.gov</a></p>` : ""}`;
        } catch (e) {
            container.innerHTML = `
                <div class="no-recalls">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>Could not reach NHTSA at this time. <a href="https://www.nhtsa.gov" target="_blank" style="color:var(--c-gold)">Check manually at nhtsa.gov</a></span>
                </div>`;
        }
    }

    /* ── 404 state ── */
    function renderNotFound() {
        document.getElementById("vd-content").innerHTML = `
            <div style="text-align:center;padding:120px 32px;">
                <span class="small-label gold">404</span>
                <h1 style="font-family:var(--f-serif);font-size:3rem;margin:18px 0 14px;font-weight:500">Vehicle not found.</h1>
                <p style="color:var(--c-ink-2);margin:0 0 32px">That listing may have sold or the URL is incorrect.</p>
                <a href="buy.html" class="btn btn-primary">Browse Inventory</a>
            </div>`;
    }

    /* ── Init ── */
    document.addEventListener("DOMContentLoaded", () => {
        const id = getCarId();
        if (!id || !window.INVENTORY) { renderNotFound(); return; }

        const car = window.INVENTORY.find(c => c.id === Number(id));
        if (!car) { renderNotFound(); return; }

        renderPage(car);
    });
})();