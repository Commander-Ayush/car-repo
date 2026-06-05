/* sell.js — sell form validation & submit */
(function () {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        const f = document.getElementById("sell-form");
        if (!f) return;
        f.addEventListener("submit", (e) => {
            e.preventDefault();
            let ok = true;
            f.querySelectorAll("[required]").forEach((el) => {
                if (!el.value.trim()) { el.style.borderColor = "#b94a3c"; ok = false; }
                else el.style.borderColor = "";
            });
            if (!ok) return window.toast("Please complete the highlighted fields.");
            f.reset();
            window.toast("Thanks — your appraisal request is in. Offer in 24 hours.");
        });
    });
})();
