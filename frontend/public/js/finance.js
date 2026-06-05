/* finance.js — calculator + apply modal */
(function () {
    "use strict";

    function injectApplyModal() {
        if (document.getElementById("modal-finance")) return;
        document.body.insertAdjacentHTML("beforeend", `
        <div class="modal" id="modal-finance" data-testid="finance-modal" aria-hidden="true">
            <div class="modal-backdrop" data-action="close-modal"></div>
            <div class="modal-card">
                <button class="modal-close" data-action="close-modal" data-testid="finance-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
                <span class="small-label">Finance &mdash; Soft Credit Pull</span>
                <h3>Pre-qualify in four minutes.</h3>
                <p class="modal-sub">No impact on your credit score.</p>
                <form id="finance-form" novalidate>
                    <div class="form-row two">
                        <div class="field"><label>Full Name</label><input required name="name" data-testid="fin-name" /></div>
                        <div class="field"><label>Email</label><input required type="email" name="email" data-testid="fin-email" /></div>
                    </div>
                    <div class="form-row two">
                        <div class="field"><label>Phone</label><input required name="phone" data-testid="fin-phone" /></div>
                        <div class="field"><label>Annual income</label><input required name="income" placeholder="$120,000" data-testid="fin-income" /></div>
                    </div>
                    <div class="form-row two">
                        <div class="field"><label>Employment</label>
                            <select name="employment" data-testid="fin-employment">
                                <option>Full-time</option><option>Self-employed</option><option>Retired</option><option>Other</option>
                            </select>
                        </div>
                        <div class="field"><label>Credit range</label>
                            <select name="credit" data-testid="fin-credit">
                                <option>Excellent (720+)</option><option>Good (660-719)</option><option>Fair (620-659)</option><option>Below 620</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary block" data-testid="fin-submit">Begin Pre-Qualification</button>
                </form>
            </div>
        </div>`);

        document.getElementById("finance-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            let ok = true;
            form.querySelectorAll("[required]").forEach((el) => {
                if (!el.value.trim()) { el.style.borderColor = "#b94a3c"; ok = false; }
                else el.style.borderColor = "";
            });
            if (!ok) return window.toast("Please complete the highlighted fields.");
            form.reset();
            window.closeAllModals();
            window.toast("Pre-qualification started. A specialist will reach out shortly.");
        });
    }

    function calcMonthly() {
        const $ = (s) => document.getElementById(s);
        if (!$("calc-price")) return;
        const price = +$("calc-price").value;
        const down = Math.min(+$("calc-down").value, price);
        const months = +$("calc-term").value;
        const apr = +$("calc-apr").value;
        const P = price - down;
        const r = (apr / 100) / 12;
        const M = r === 0 ? P / months : (P * r) / (1 - Math.pow(1 + r, -months));
        $("calc-price-out").textContent = "$" + price.toLocaleString();
        $("calc-down-out").textContent = "$" + down.toLocaleString();
        $("calc-term-out").textContent = months + " months";
        $("calc-apr-out").textContent = apr.toFixed(2) + "%";
        $("calc-monthly").textContent = "$" + Math.round(M).toLocaleString();
    }

    document.addEventListener("DOMContentLoaded", () => {
        injectApplyModal();
        calcMonthly();
        document.addEventListener("input", (e) => {
            if (e.target.id && e.target.id.startsWith("calc-")) calcMonthly();
        });
    });
})();
