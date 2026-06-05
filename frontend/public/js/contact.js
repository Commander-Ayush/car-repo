/* contact.js */
(function () {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        const f = document.getElementById("contact-form");
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
            window.toast("Message sent. Our concierge will respond shortly.");
        });
    });
})();
