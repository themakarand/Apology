const screens = [...document.querySelectorAll(".screen")];
const progress = document.getElementById("progress");
let current = 0;

function showScreen(index) {
  current = Math.max(0, Math.min(index, screens.length - 1));
  screens.forEach((screen, i) => screen.classList.toggle("active", i === current));
  progress.textContent = `${current + 1} / ${screens.length}`;
}

document.querySelectorAll(".next").forEach(button => {
  button.addEventListener("click", () => showScreen(current + 1));
});

document.getElementById("open-envelope").addEventListener("click", () => {
  showScreen(4);
});

document.getElementById("envelope").addEventListener("click", (event) => {
  const envelope = event.currentTarget;
  envelope.classList.add("open");
  document.getElementById("envelope-hint").textContent = "Your little note is ready ♡";
  setTimeout(() => showScreen(5), 850);
});

document.getElementById("yes-button").addEventListener("click", () => {
  document.getElementById("final-message").textContent =
    "Thank you for hearing me out. It means a lot. ♡";
  startHeartRain();
});

document.getElementById("maybe-button").addEventListener("click", () => {
  document.getElementById("final-message").textContent =
    "That's okay. Take all the time you need. ♡";
});

// Make the Maybe button run away from the cursor (mouse + touch)
(function () {
  const btn = document.getElementById("maybe-button");

  function flee(clientX, clientY) {
    const container = btn.closest(".screen");
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();

    const halfW = bRect.width / 2;
    const halfH = bRect.height / 2;

    // Safe boundary limits (8 px padding from each edge)
    const pad = 8;
    const minX = cRect.left + halfW + pad;
    const maxX = cRect.right  - halfW - pad;
    const minY = cRect.top   + halfH + pad;
    const maxY = cRect.bottom - halfH - pad;

    // Centre of the button
    const bCx = bRect.left + halfW;
    const bCy = bRect.top  + halfH;

    // Direction away from finger / cursor
    const dx = bCx - clientX;
    const dy = bCy - clientY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;

    const step = 130;
    let nx = bCx + (dx / dist) * step;
    let ny = bCy + (dy / dist) * step;

    // If the jump would hit a wall, teleport to the opposite quadrant
    if (nx < minX || nx > maxX || ny < minY || ny > maxY) {
      const cursorRelX = (clientX - cRect.left) / cRect.width;
      const cursorRelY = (clientY - cRect.top)  / cRect.height;

      const targetRelX = cursorRelX < 0.5
        ? 0.60 + Math.random() * 0.25
        : 0.15 + Math.random() * 0.25;
      const targetRelY = cursorRelY < 0.5
        ? 0.60 + Math.random() * 0.25
        : 0.15 + Math.random() * 0.25;

      nx = cRect.left + targetRelX * cRect.width;
      ny = cRect.top  + targetRelY * cRect.height;
    }

    // Final clamp as safety net
    nx = Math.min(Math.max(nx, minX), maxX);
    ny = Math.min(Math.max(ny, minY), maxY);

    btn.style.position   = "absolute";
    btn.style.left       = (nx - cRect.left - halfW) + "px";
    btn.style.top        = (ny - cRect.top  - halfH) + "px";
    btn.style.margin     = "0";
    btn.style.transition = "left 0.12s ease, top 0.12s ease";
  }

  // ── Desktop: flee on mouse hover ──────────────────────────────────────────
  btn.addEventListener("mousemove", (e) => flee(e.clientX, e.clientY));

  // ── Mobile: flee the instant a finger touches, and while it drags ─────────
  // touchstart fires BEFORE click, so the button escapes before the tap lands.
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // blocks the delayed synthetic click
    const t = e.touches[0];
    flee(t.clientX, t.clientY);
  }, { passive: false });

  btn.addEventListener("touchmove", (e) => {
    e.preventDefault(); // stops page scroll while chasing the button
    const t = e.touches[0];
    flee(t.clientX, t.clientY);
  }, { passive: false });
})();

let heartRainInterval = null;

function spawnHeart() {
  const emojis = ["♡", "♥", "💗", "💕", "💖", "✨"];
  const heart = document.createElement("span");
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const size     = 14 + Math.random() * 26;         // 14–40 px
  const left     = Math.random() * 100;              // 0–100 vw
  const duration = 1.8 + Math.random() * 2;          // 1.8–3.8 s fall speed
  const wobble   = (Math.random() - 0.5) * 60;       // slight left/right drift
  const colors   = ["#ff5fa8", "#ffffff", "#ffd6f0", "#cc55ff", "#ff88cc"];
  const color    = colors[Math.floor(Math.random() * colors.length)];

  heart.style.cssText = `
    position: fixed;
    left: ${left}vw;
    top: -36px;
    color: ${color};
    font-size: ${size}px;
    pointer-events: none;
    z-index: 999;
    opacity: 1;
    transition: transform ${duration}s linear, opacity ${duration}s ease-in;
  `;
  document.body.appendChild(heart);

  // Double rAF ensures the starting style is painted before the transition fires
  requestAnimationFrame(() => requestAnimationFrame(() => {
    heart.style.transform = `translateY(${window.innerHeight + 60}px) translateX(${wobble}px) rotate(${Math.random() * 360}deg)`;
    heart.style.opacity   = "0";
  }));

  setTimeout(() => heart.remove(), (duration + 0.4) * 1000);
}

function startHeartRain() {
  if (heartRainInterval) return; // already running

  // Immediate burst so it feels instant
  for (let i = 0; i < 18; i++) {
    setTimeout(spawnHeart, Math.random() * 800);
  }

  // Then keep raining continuously (one new heart every ~220 ms)
  heartRainInterval = setInterval(spawnHeart, 220);
}

// Allow tapping anywhere on the first three story screens to continue.
[0, 1, 2].forEach(index => {
  screens[index].addEventListener("click", event => {
    if (event.target.closest("button")) return;
    showScreen(index + 1);
  });
});
showScreen(0);
