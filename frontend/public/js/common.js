/* =====================================================================
   common.js — used on every page
   - Binds BRAND into [data-bind] elements
   - Highlights active nav link
   - Mobile burger
   - Injects Test Drive modal & wires its open/close
   - Toast helper
   - Modal helpers exposed on window for other scripts
   ===================================================================== */

(function () {
    "use strict";

    /* ---------- Shared NAV ---------- */
    function injectNav() {
        const slot = document.getElementById("nav-root");
        if (!slot) return;
        slot.outerHTML = `
        <header class="nav" id="nav" data-testid="main-nav">
            <div class="nav-inner">
                <a href="index.html" class="nav-brand" data-testid="nav-brand">
                    <span class="brand-mark">M</span>
                    <span class="brand-wordmark"><span data-bind="brandName">Maison Avenir</span></span>
                </a>
                <nav class="nav-links">
                    <a href="buy.html" data-testid="nav-buy-link">Buy</a>
                    <a href="sell.html" data-testid="nav-sell-link">Sell</a>
                    <a href="finance.html" data-testid="nav-finance-link">Finance</a>
                    <a href="services.html" data-testid="nav-services-link">Services</a>
                    <a href="pricing.html" data-testid="nav-pricing-link">Pricing</a>
                    <a href="testimonials.html" data-testid="nav-testimonials-link">Stories</a>
                    <a href="contact.html" data-testid="nav-contact-link">Contact</a>
                </nav>
                <button class="btn btn-primary nav-cta" data-action="open-testdrive" data-testid="nav-test-drive-btn">Book a Test Drive</button>
                <button class="nav-burger" aria-label="Menu" data-testid="nav-burger"><i class="fa-solid fa-bars"></i></button>
            </div>
        </header>`;
    }

    /* ---------- Shared FOOTER ---------- */
    function injectFooter() {
        const slot = document.getElementById("footer-root");
        if (!slot) return;
        slot.outerHTML = `
        <footer class="footer" data-testid="footer">
            <div class="footer-inner">
                <div class="footer-brand">
                    <span class="brand-mark">M</span>
                    <div>
                        <strong data-bind="brandName">Maison Avenir</strong>
                        <p data-bind="tagline">Pre-owned luxury, presented properly.</p>
                    </div>
                </div>
                <div class="footer-cols">
                    <div>
                        <span class="small-label">Inventory</span>
                        <a href="buy.html">Buy Used Cars</a>
                        <a href="sell.html">Sell Your Car</a>
                        <a href="finance.html">Finance</a>
                    </div>
                    <div>
                        <span class="small-label">Studio</span>
                        <a href="services.html">Services</a>
                        <a href="pricing.html">Service Plans</a>
                        <a href="testimonials.html">Stories</a>
                    </div>
                    <div>
                        <span class="small-label">Visit</span>
                        <p data-bind="address">9472 Wilshire Boulevard, Beverly Hills, CA 90212</p>
                        <p><a data-bind="phone" data-bind-href="tel:phone">+1 (310) 555-0142</a></p>
                    </div>
                </div>
            </div>
            <div class="footer-base">
                <span>&copy; <span id="year">2026</span> <span data-bind="brandName">Maison Avenir</span>. All rights reserved.</span>
                <span>Licensed motor vehicle dealer &middot; DMV #87214</span>
            </div>
        </footer>`;
    }

    /* ---------- Brand binding (Thymeleaf-style) ---------- */
    function applyBrand() {
        const B = window.BRAND;
        document.querySelectorAll("[data-bind]").forEach((el) => {
            const key = el.getAttribute("data-bind");
            if (B[key] !== undefined) {
                if (el.children.length === 0) el.textContent = B[key];
                else el.innerHTML = B[key];
            }
        });
        document.querySelectorAll("[data-bind-href]").forEach((el) => {
            const ref = el.getAttribute("data-bind-href");
            const [scheme, key] = ref.split(":");
            if (B[key] !== undefined) el.setAttribute("href", `${scheme}:${B[key]}`);
        });
        document.querySelectorAll("[data-bind-src]").forEach((el) => {
            const key = el.getAttribute("data-bind-src");
            if (B.images && B.images[key]) el.setAttribute("src", B.images[key]);
        });
        const title = document.querySelector("title[data-bind]");
        if (title) title.textContent = `${B.brandName} — ${title.getAttribute("data-title-suffix") || "Pre-Owned Luxury"}`;
        const y = document.getElementById("year");
        if (y) y.textContent = new Date().getFullYear();
    }

    /* ---------- Active nav link ---------- */
    function highlightActiveNav() {
        const path = location.pathname.split("/").pop() || "index.html";
        document.querySelectorAll(".nav-links a").forEach((a) => {
            const href = (a.getAttribute("href") || "").split("/").pop();
            if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
        });
    }

    /* ---------- Burger ---------- */
    function bindBurger() {
        const burger = document.querySelector(".nav-burger");
        const nav = document.querySelector(".nav");
        if (burger && nav) burger.addEventListener("click", () => nav.classList.toggle("open"));
    }

    /* ---------- Modal helpers (global) ---------- */
    window.openModal = function (id) {
        const m = document.getElementById(id);
        if (!m) return;
        m.classList.add("open");
        m.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };
    window.closeAllModals = function () {
        document.querySelectorAll(".modal.open").forEach((m) => {
            m.classList.remove("open");
            m.setAttribute("aria-hidden", "true");
        });
        document.body.style.overflow = "";
    };

    /* ---------- Toast ---------- */
    window.toast = function (msg) {
        const t = document.getElementById("toast");
        if (!t) return;
        document.getElementById("toast-msg").textContent = msg;
        t.classList.add("show");
        clearTimeout(window.toast._t);
        window.toast._t = setTimeout(() => t.classList.remove("show"), 2800);
    };

    /* ---------- Test Drive modal (injected on every page) ---------- */
    function injectTestDriveModal() {
        if (document.getElementById("modal-testdrive")) return;
        const html = `
        <div class="modal" id="modal-testdrive" data-testid="testdrive-modal" aria-hidden="true">
            <div class="modal-backdrop" data-action="close-modal"></div>
            <div class="modal-card">
                <button class="modal-close" data-action="close-modal" data-testid="testdrive-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
                <span class="small-label">Test Drive</span>
                <h3>Reserve your moment behind the wheel.</h3>
                <p class="modal-sub">Pick a vehicle and a time. We'll confirm by text within an hour.</p>
                <form id="testdrive-form" novalidate>
                    <div class="form-row two">
                        <div class="field"><label>Full Name</label><input required name="name" data-testid="td-name" /></div>
                        <div class="field"><label>Phone</label><input required name="phone" data-testid="td-phone" /></div>
                    </div>
                    <div class="field"><label>Email</label><input required type="email" name="email" data-testid="td-email" /></div>
                    <div class="field"><label>Vehicle of interest</label>
                        <select required name="vehicle" id="td-vehicle" data-testid="td-vehicle">
                            <option value="">Select a vehicle…</option>
                        </select>
                    </div>
                    <div class="form-row two">
                        <div class="field"><label>Preferred date</label><input required type="date" name="date" data-testid="td-date" /></div>
                        <div class="field"><label>Preferred time</label>
                            <select required name="time" data-testid="td-time">
                                <option>10:00</option><option>11:30</option><option>13:00</option><option>14:30</option><option>16:00</option><option>17:30</option>
                            </select>
                        </div>
                    </div>
                    <div class="field"><label>Notes (optional)</label><textarea rows="3" name="notes" data-testid="td-notes"></textarea></div>
                    <button type="submit" class="btn btn-primary block" data-testid="td-submit">Confirm Test Drive</button>
                </form>
            </div>
        </div>
        <div class="toast" id="toast" data-testid="toast" aria-hidden="true">
            <i class="fa-solid fa-circle-check"></i><span id="toast-msg">Saved</span>
        </div>`;
        document.body.insertAdjacentHTML("beforeend", html);

        // Populate vehicle selector if INVENTORY available
        if (window.INVENTORY) {
            const sel = document.getElementById("td-vehicle");
            sel.innerHTML = `<option value="">Select a vehicle…</option>` +
                window.INVENTORY.map(c => `<option value="${c.id}">${c.year} ${c.title} — $${c.price.toLocaleString()}</option>`).join("");
        }

        // Submit handler
        document.getElementById("testdrive-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const required = form.querySelectorAll("[required]");
            let ok = true;
            required.forEach((el) => {
                if (!el.value.trim()) { el.style.borderColor = "#b94a3c"; ok = false; }
                else el.style.borderColor = "";
            });
            if (!ok) return window.toast("Please complete the highlighted fields.");
            form.reset();
            window.closeAllModals();
            window.toast("Test drive request received. We'll confirm by text within an hour.");
        });
    }

    /* ---------- Delegated action handler ---------- */
    function bindActions() {
        document.addEventListener("click", (e) => {
            const a = e.target.closest("[data-action]");
            if (!a) return;
            const action = a.getAttribute("data-action");
            if (action === "open-testdrive") {
                const v = a.getAttribute("data-vehicle");
                if (v && document.getElementById("td-vehicle")) document.getElementById("td-vehicle").value = v;
                window.openModal("modal-testdrive");
            }
            if (action === "close-modal") window.closeAllModals();
        });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") window.closeAllModals(); });
    }

    /* ---------- Emergent badge ---------- */
    function injectEmergentBadge() {
        if (document.getElementById("emergent-badge")) return;
        document.body.insertAdjacentHTML("beforeend", `
        <a id="emergent-badge" target="_blank" href="https://app.emergent.sh/?utm_source=emergent-badge" style="display:inline-flex !important;box-sizing:border-box;width:178px;height:40px;padding:8px 12px;align-items:center !important;gap:8px;border-radius:50px !important;background:#000 !important;position:fixed !important;bottom:16px;right:16px;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,sans-serif !important;font-size:12px !important;z-index:9999 !important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15.5702 8.13142C15.7729 8.0412 16.0007 8.18878 15.9892 8.4103C15.8374 11.3192 14.0965 14.0405 11.2531 15.3065C8.40964 16.5725 5.2224 16.0453 2.95912 14.2117C2.78676 14.072 2.82955 13.804 3.03219 13.7137L4.95677 12.8568C5.04866 12.8159 5.15446 12.823 5.24204 12.8725C6.73377 13.7153 8.59176 13.8649 10.2772 13.1145C11.9626 12.3641 13.0947 10.8833 13.4665 9.21075C13.4883 9.11256 13.5539 9.02918 13.6457 8.98827L15.5702 8.13142Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.3066 4.74698L15.5067 5.19653C15.5759 5.35178 15.5061 5.53366 15.3508 5.60278L1.29992 11.8586C1.14467 11.9278 0.962794 11.8579 0.893675 11.7027L0.701732 11.2716L0.693457 11.2531C-1.10317 7.21778 0.711626 2.49007 4.74692 0.693443C8.78221 -1.10318 13.51 0.711693 15.3066 4.74698ZM2.82356 8.55367C2.63552 8.63739 2.41991 8.51617 2.40853 8.31065C2.28373 6.05724 3.53858 3.85787 5.72286 2.88536C7.90715 1.91286 10.3813 2.45199 11.9724 4.05256C12.1175 4.19854 12.0633 4.43988 11.8753 4.5236L2.82356 8.55367Z" fill="white"/></svg>
            <p style="color:#FFF !important;font-family:'Inter',sans-serif !important;font-size:13px !important;font-weight:600 !important;margin:0 !important;white-space:nowrap !important;">Made with Emergent</p>
        </a>`);
    }

    document.addEventListener("DOMContentLoaded", () => {
        injectNav();
        injectFooter();
        injectEmergentBadge();
        applyBrand();
        highlightActiveNav();
        bindBurger();
        injectTestDriveModal();
        bindActions();
    });
})();

/* ---------- Shared utility for page scripts ---------- */
window.MA = {
    $: (s, p) => (p || document).querySelector(s),
    $$: (s, p) => Array.from((p || document).querySelectorAll(s)),
    fmt$: (n) => "$" + Math.round(n).toLocaleString(),
    fmtMi: (n) => Number(n).toLocaleString() + " mi",
    esc: (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]),
    slug: (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
};
