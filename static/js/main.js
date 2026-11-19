// Vesli - main.js
// Everything here is progressive: the site works without JavaScript.

document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupShowcase();
  setupTabs(document.querySelector(".usecase-tabs"));
  setupBookingDemo();
  setupMenuDemo();
  setupOrderDemo();
  setupSpotlight();
  setupReveal();
  setupTimeline();
  setupDotWave();
});

/* ---------- Mobile menu ---------- */
function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Sluiten" : "Menu";
  });
}

/* ---------- Accessible tabs (arrow keys move between tabs) ---------- */
function setupTabs(tablist, onSelect) {
  if (!tablist) return null;
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];

  function select(tab, focus = false) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    if (onSelect) onSelect(tab, tabs.indexOf(tab));
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") select(tabs[(i + 1) % tabs.length], true);
      if (e.key === "ArrowLeft") select(tabs[(i - 1 + tabs.length) % tabs.length], true);
    });
  });

  return { tabs, select };
}

/* ---------- Hero showcase: laptop + phone, cycles by itself ---------- */
function setupShowcase() {
  const tablist = document.querySelector(".showcase-tabs");
  if (!tablist) return;

  const url = document.querySelector(".browser-url");
  const phoneScreens = document.querySelectorAll("[data-phone]");
  const CYCLE = 6000;
  let timer = null;
  let userChose = false;

  const control = setupTabs(tablist, (tab) => {
    const key = tab.getAttribute("aria-controls").replace("show-", "");
    if (url) url.textContent = tab.dataset.url;
    phoneScreens.forEach((s) => (s.hidden = s.dataset.phone !== key));
    restartProgress(tab);
  });

  function restartProgress(tab) {
    tablist.querySelectorAll(".tab-progress").forEach((bar) => bar.classList.remove("is-running"));
    if (userChose || reduceMotion) return;
    const bar = tab.querySelector(".tab-progress");
    void bar.offsetWidth; // restart the CSS animation
    bar.style.setProperty("--cycle", CYCLE + "ms");
    bar.classList.add("is-running");
  }

  function next() {
    const tabs = control.tabs;
    const current = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    control.select(tabs[(current + 1) % tabs.length]);
  }

  // Stop cycling as soon as the visitor picks an example themselves.
  tablist.addEventListener("click", () => {
    userChose = true;
    clearInterval(timer);
    tablist.querySelectorAll(".tab-progress").forEach((bar) => bar.classList.remove("is-running"));
  });

  if (!reduceMotion) {
    restartProgress(control.tabs[0]);
    timer = setInterval(() => !userChose && next(), CYCLE);
  }
}

/* ---------- Demo: booking (kapper) ---------- */
function setupChipGroup(group, onChange) {
  const chips = [...group.querySelectorAll(".chip")];
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-pressed", String(c === chip));
      });
      if (onChange) onChange(chip);
    });
  });
}

function setupBookingDemo() {
  const demo = document.querySelector('[data-demo="booking"]');
  if (!demo) return;
  const result = demo.querySelector(".demo-result");
  demo.querySelectorAll(".chip-row").forEach((g) => setupChipGroup(g, () => (result.textContent = "")));

  demo.querySelector(".demo-submit").addEventListener("click", () => {
    const treatment = demo.querySelector('[data-group="treatment"] .is-active').textContent;
    const time = demo.querySelector('[data-group="time"] .is-active').textContent;
    result.textContent = `Gelukt! ${treatment} op dinsdag om ${time}.`;
  });
}

/* ---------- Demo: menu (café) ---------- */
function setupMenuDemo() {
  const demo = document.querySelector('[data-demo="menu"]');
  if (!demo) return;
  setupChipGroup(demo.querySelector(".chip-row"), (chip) => {
    demo.querySelectorAll(".demo-menu").forEach((list) => {
      list.hidden = list.dataset.items !== chip.dataset.menu;
    });
  });
}

/* ---------- Demo: order (lunchroom) ---------- */
function setupOrderDemo() {
  const demo = document.querySelector('[data-demo="order"]');
  if (!demo) return;
  const totalEl = demo.querySelector(".order-total strong");
  const result = demo.querySelector(".demo-result");
  const euro = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

  function update() {
    let total = 0;
    demo.querySelectorAll(".order-list li").forEach((row) => {
      total += Number(row.dataset.price) * Number(row.querySelector("output").value);
    });
    totalEl.textContent = euro.format(total);
    return total;
  }

  demo.querySelectorAll(".order-list li").forEach((row) => {
    const out = row.querySelector("output");
    out.value = out.textContent;
    const [minus, plus] = row.querySelectorAll("button");
    minus.addEventListener("click", () => { out.value = Math.max(0, Number(out.value) - 1); update(); result.textContent = ""; });
    plus.addEventListener("click", () => { out.value = Math.min(9, Number(out.value) + 1); update(); result.textContent = ""; });
  });

  demo.querySelector(".demo-submit").addEventListener("click", () => {
    const total = update();
    result.textContent = total > 0
      ? `Bestelling van ${euro.format(total)} geplaatst. Ophalen om 12:30.`
      : "Kies eerst iets van het menu.";
  });

  update();
}

/* ---------- Spotlight follows the pointer ---------- */
function setupSpotlight() {
  document.querySelectorAll(".spotlight").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Reveal elements when they scroll into view ---------- */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  // Stagger siblings slightly
  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--delay", `${siblings.indexOf(el) * 0.08}s`);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => io.observe(el));
}

/* ---------- Timeline line fills while scrolling ---------- */
function setupTimeline() {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return;
  if (reduceMotion) { timeline.style.setProperty("--progress", 1); return; }

  let ticking = false;
  function update() {
    const r = timeline.getBoundingClientRect();
    const start = window.innerHeight * 0.75;
    const progress = Math.min(1, Math.max(0, (start - r.top) / r.height));
    timeline.style.setProperty("--progress", progress.toFixed(3));
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

/* ---------- Hero background: 3D dot wave on a canvas ---------- */
function setupDotWave() {
  const canvas = document.querySelector(".hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const COLS = 60, ROWS = 30, SPACING = 44;
  let width = 0, height = 0, dpr = 1, running = true, frame = null;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const horizon = height * 0.16;
    const camera = 520;

    for (let z = 0; z < ROWS; z++) {
      for (let x = 0; x < COLS; x++) {
        const wx = (x - COLS / 2) * SPACING;
        const wz = z * SPACING + 120;
        const wy = Math.sin(x * 0.28 + t * 0.0009) * 26 + Math.cos(z * 0.35 + t * 0.0007) * 26;

        const scale = camera / (camera + wz);
        const sx = cx + wx * scale;
        const sy = horizon + (260 - wy) * scale + wz * scale * 0.55;
        if (sx < -10 || sx > width + 10 || sy > height + 10) continue;

        const depth = 1 - z / ROWS;
        ctx.globalAlpha = 0.08 + depth * 0.5;
        ctx.fillStyle = wy > 20 ? "#5ef2cf" : "#3f8f85";
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.6, 2.2 * scale), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    if (!running) return;
    draw(t);
    frame = requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener("resize", () => { resize(); if (reduceMotion) draw(0); });

  if (reduceMotion) { draw(0); return; }

  // Pause the animation when the hero is off screen to save battery.
  new IntersectionObserver(([entry]) => {
    running = entry.isIntersecting;
    if (running) frame = requestAnimationFrame(loop);
    else cancelAnimationFrame(frame);
  }).observe(canvas);
}
