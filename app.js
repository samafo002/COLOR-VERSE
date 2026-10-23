/* */

(() => {
  "use strict";

  /* */

  const CONFIG = {
    FREE_PER_DAY: 5,
    HISTORY_LIMIT: 30,
    SCENES_BASE: "./scenes/",
    MUSIC_BASE: "./music/",
    API_BASE: "https://colorverse-backend-k6b8.onrender.com/api",
  };

  const PALETTE = [
    "#e63946", "#f77f00", "#fcbf49", "#a8dadc",
    "#457b9d", "#1d3557", "#06d6a0", "#118ab2",
    "#ef476f", "#ffd166", "#8338ec", "#3a86ff",
    "#000000", "#ffffff", "#8d99ae", "#2b2d42",
    "#ff006e", "#fb5607",
  ];

  const COUNTRIES = [
    { code: "NG", flag: "🇳🇬", name: "Nigeria" },
    { code: "JP", flag: "🇯🇵", name: "Japan" },
    { code: "IN", flag: "🇮🇳", name: "India" },
    { code: "BR", flag: "🇧🇷", name: "Brazil" },
    { code: "GLOBAL", flag: "🌍", name: "Global" },
  ];

  const CATEGORIES = [
    { id: "places",       emoji: "📍", title: "Places" },
    { id: "animals",      emoji: "🦁", title: "Animals" },
    { id: "people",       emoji: "🧑🏾‍🤝‍🧑🏽", title: "People" },
    { id: "culture",      emoji: "🎭", title: "Culture" },
    { id: "food",         emoji: "🍲", title: "Food" },
    { id: "nature",       emoji: "🌿", title: "Nature" },
    { id: "vehicles",     emoji: "🚌", title: "Vehicles" },
    { id: "festivals",    emoji: "🎉", title: "Festivals" },
    { id: "history",      emoji: "🏺", title: "History" },
    { id: "artists",      emoji: "🎤", title: "Faces" },
    { id: "afrofuturism", emoji: "🚀", title: "Afrofuturism" },
    { id: "ancient",      emoji: "🗿", title: "Ancient" },
  ];

  const SCENES = [
    { id: "ng-market",    country: "NG", category: "places", emoji: "🧺", title: "Balogun Market" },
    { id: "ng-school",    country: "NG", category: "places", emoji: "🏫", title: "Village School" },
    { id: "ng-riverside", country: "NG", category: "places", emoji: "🌊", title: "Riverside" },
    { id: "ng-eatery",    country: "NG", category: "places", emoji: "🍽️", title: "Bukka Eatery" },
    { id: "ng-lounge",    country: "NG", category: "places", emoji: "🍸", title: "Lounge Bar" },
    { id: "ng-mosque",    country: "NG", category: "places", emoji: "🕌", title: "Central Mosque" },
    { id: "ng-church",    country: "NG", category: "places", emoji: "⛪", title: "Village Church" },
    { id: "ng-library",   country: "NG", category: "places", emoji: "📚", title: "Library" },

    { id: "ng-elephant",  country: "NG", category: "animals", emoji: "🐘", title: "Yankari Elephant" },
    { id: "ng-peacock",   country: "NG", category: "animals", emoji: "🦚", title: "Peacock" },
    { id: "ng-monkey",    country: "NG", category: "animals", emoji: "🐒", title: "Forest Monkey" },
    { id: "ng-goat",      country: "NG", category: "animals", emoji: "🐐", title: "Market Goat" },

    { id: "ng-gele",      country: "NG", category: "people", emoji: "👩🏾", title: "Gele Head Wrap" },
    { id: "ng-agbada",    country: "NG", category: "people", emoji: "🧑🏾", title: "Agbada Elder" },
    { id: "ng-drummer",   country: "NG", category: "people", emoji: "🥁", title: "Talking Drummer" },

    { id: "ng-eyo",       country: "NG", category: "culture", emoji: "🎭", title: "Eyo Festival" },
    { id: "ng-durbar",    country: "NG", category: "culture", emoji: "🐎", title: "Kano Durbar" },
    { id: "ng-adire",     country: "NG", category: "culture", emoji: "🧵", title: "Adire Textile" },

    { id: "ng-jollof",    country: "NG", category: "food", emoji: "🍚", title: "Jollof Rice" },
    { id: "ng-suya",      country: "NG", category: "food", emoji: "🍢", title: "Suya Grill" },
    { id: "ng-pepper",    country: "NG", category: "food", emoji: "🍲", title: "Pepper Soup" },

    { id: "ng-zuma",      country: "NG", category: "nature", emoji: "🪨", title: "Zuma Rock" },
    { id: "ng-waterfall", country: "NG", category: "nature", emoji: "💧", title: "Erin-Ijesha" },

    { id: "ng-danfo",     country: "NG", category: "vehicles", emoji: "🚌", title: "Danfo Bus" },
    { id: "ng-keke",      country: "NG", category: "vehicles", emoji: "🛺", title: "Keke Napep" },

    { id: "ng-new-yam",   country: "NG", category: "festivals", emoji: "🍠", title: "New Yam Festival" },
    { id: "ng-argungu",   country: "NG", category: "festivals", emoji: "🎣", title: "Argungu Fishing" },

    { id: "ng-benin",     country: "NG", category: "history", emoji: "🏺", title: "Benin Bronze" },
    { id: "ng-nok",       country: "NG", category: "history", emoji: "🗿", title: "Nok Terracotta" },

    { id: "ng-afro-fusion", country: "NG", category: "artists", emoji: "🔥", title: "Afro-fusion Star" },
    { id: "ng-afropop-q",   country: "NG", category: "artists", emoji: "👑", title: "Afro-pop Queen" },
    { id: "ng-rapper",      country: "NG", category: "artists", emoji: "🎤", title: "Rapper" },

    { id: "af-city",      country: "GLOBAL", category: "afrofuturism", emoji: "🏙️", title: "Floating Lagos" },
    { id: "af-warrior",   country: "GLOBAL", category: "afrofuturism", emoji: "🛡️", title: "Neo-Warrior" },
    { id: "af-queen",     country: "GLOBAL", category: "afrofuturism", emoji: "👑", title: "Cosmic Queen" },

    { id: "an-ife",       country: "GLOBAL", category: "ancient", emoji: "🗿", title: "Ife Heads" },
    { id: "an-benin-wall",country: "GLOBAL", category: "ancient", emoji: "🏛️", title: "Benin Walls" },
    { id: "an-mali",      country: "GLOBAL", category: "ancient", emoji: "🕌", title: "Great Mosque" },

    { id: "g-forest",     country: "GLOBAL", category: "places", emoji: "🌲", title: "Forest Path" },
    { id: "g-restaurant", country: "GLOBAL", category: "places", emoji: "🍽️", title: "Restaurant" },
    { id: "g-school",     country: "GLOBAL", category: "places", emoji: "🏫", title: "School" },

    { id: "g-lion",       country: "GLOBAL", category: "animals", emoji: "🦁", title: "Lion" },
    { id: "g-dolphin",    country: "GLOBAL", category: "animals", emoji: "🐬", title: "Dolphins" },
    { id: "g-owl",        country: "GLOBAL", category: "animals", emoji: "🦉", title: "Owl" },
  ];

  const MUSIC_CHANNELS = [
    { id: "afrobeats", emoji: "🥁", title: "Afrobeats", file: "afrobeats-01.mp3" },
    { id: "amapiano",  emoji: "🎹", title: "Amapiano",  file: "amapiano-01.mp3" },
    { id: "hiphop",    emoji: "🎤", title: "Hip-Hop",   file: "hiphop-01.mp3" },
    { id: "lofi",      emoji: "🎧", title: "Lo-Fi",     file: "lofi-01.mp3" },
    { id: "acoustic",  emoji: "🎸", title: "Acoustic",  file: "acoustic-01.mp3" },
    { id: "gospel",    emoji: "🙏", title: "Gospel",    file: "gospel-01.mp3" },
  ];

  /* */

  const $ = (id) => document.getElementById(id);

  const el = {
    paywall: $("paywall"),
    btnAuth: $("btn-auth"),
    authModal: $("auth-modal"),
    authTitle: $("auth-title"),
    authSub: $("auth-sub"),
    authForm: $("auth-form"),
    authEmail: $("auth-email"),
    authPassword: $("auth-password"),
    authSubmit: $("auth-submit"),
    authError: $("auth-error"),
    authSwitchText: $("auth-switch-text"),
    authSwitchBtn: $("auth-switch-btn"),
    authClose: $("auth-close"),
    streakCount: $("streak-count"),
    quotaText: $("quota-text"),
    btnUndo: $("btn-undo"),
    btnRedo: $("btn-redo"),
    btnClear: $("btn-clear"),
    btnSave: $("btn-save"),
    btnShare: $("btn-share"),
    challengeCard: $("challenge-card"),
    chEmoji: $("ch-emoji"),
    chName: $("ch-name"),
    chMeta: $("ch-meta"),
    chStart: $("ch-start"),
    countryFlag: $("country-flag"),
    countryLabel: $("country-label"),
    countrySelect: $("country-select"),
    categoryTabs: $("category-tabs"),
    sceneGrid: $("scene-grid"),
    sceneGridTitle: $("scene-grid-title"),
    sceneCount: $("scene-count"),
    aiPrompt: $("ai-prompt"),
    aiGenerate: $("ai-generate"),
    aiStatus: $("ai-status"),

    canvasArea: $("canvas-area"),
    canvasStack: $("canvas-stack"),
    bgCanvas: $("bg-canvas"),
    drawCanvas: $("draw-canvas"),
    overlayCanvas: $("overlay-canvas"),
    emptyState: $("empty-state"),
    loadingOverlay: $("loading-overlay"),
    loadingText: $("loading-text"),

    size: $("size"),
    sizeLabel: $("size-label"),
    opacity: $("opacity"),
    opacityLabel: $("opacity-label"),
    color: $("color"),
    swatches: $("swatches"),
    musicToggle: $("music-toggle"),
    musicChannels: $("music-channels"),
    layerList: $("layer-list"),
    layerAdd: $("layer-add"),

    paywall: $("paywall"),
    paywallAd: $("paywall-ad"),
    paywallClose: $("paywall-close"),
    shareModal: $("share-modal"),
    shareSub: $("share-sub"),
    shareUnlock: $("share-unlock"),
    shareReady: $("share-ready"),
    shareLink: $("share-link"),
    shareClose: $("share-close"),

    toast: $("toast"),
  };

  /* */

  const state = {
    country: "NG",
    category: "places",
    currentScene: null,

    tool: "brush",
    color: "#e63946",
    size: 6,
    opacity: 1,

    drawing: false,
    lastPoint: null,
    history: [],
    historyIndex: -1,

    layers: [],
    activeLayerId: null,

    quota: { day: "", freeUsed: 0, adUnlocked: 0 },
    streak: { days: 0, lastPaint: "" },
    music: { channel: null, playing: false, audio: null },

    canvasW: 0,
    canvasH: 0,
    dpr: window.devicePixelRatio || 1,
  };

  /* */

  const todayUtc = () => new Date().toISOString().slice(0, 10);

  function hexToRgba(hex, a = 1) {
    const h = hex.replace("#", "");
    const full = h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  let toastTimer = null;
  function toast(msg, ms = 1800) {
    el.toast.textContent = msg;
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("show"), ms);
  }

  function showLoading(text = "Generating…") {
    el.loadingText.textContent = text;
    el.loadingOverlay.classList.remove("hidden");
  }

  function hideLoading() {
    el.loadingOverlay.classList.add("hidden");
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  /* */

  const STORAGE_KEYS = {
    quota: "cv.quota",
    streak: "cv.streak",
    music: "cv.music",
  };

  function loadQuota() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.quota);
      const data = raw ? JSON.parse(raw) : {};
      const today = todayUtc();
      if (data.day !== today) {
        return { day: today, freeUsed: 0, adUnlocked: 0 };
      }
      return {
        day: today,
        freeUsed: data.freeUsed || 0,
        adUnlocked: data.adUnlocked || 0,
      };
    } catch {
      return { day: todayUtc(), freeUsed: 0, adUnlocked: 0 };
    }
  }

  function saveQuota() {
    localStorage.setItem(STORAGE_KEYS.quota, JSON.stringify(state.quota));
    updateQuotaBadge();
  }

  function remainingFree() {
    return Math.max(0, CONFIG.FREE_PER_DAY - state.quota.freeUsed) + state.quota.adUnlocked;
  }

  function consumeQuota() {
    if (state.quota.adUnlocked > 0) {
      state.quota.adUnlocked -= 1;
    } else if (state.quota.freeUsed < CONFIG.FREE_PER_DAY) {
      state.quota.freeUsed += 1;
    } else {
      return false;
    }
    saveQuota();
    return true;
  }

  function grantAdReward() {
    state.quota.adUnlocked += 1;
    saveQuota();
  }

  function updateQuotaBadge() {
    const remaining = remainingFree();
    if (remaining > 0) {
      el.quotaText.textContent = `${remaining}/${CONFIG.FREE_PER_DAY} free today`;
    } else {
      el.quotaText.textContent = "Out of free pages";
    }
  }

  function loadStreak() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.streak);
      return raw ? JSON.parse(raw) : { days: 0, lastPaint: "" };
    } catch {
      return { days: 0, lastPaint: "" };
    }
  }

  function recordStreak() {
    const today = todayUtc();
    const prev = state.streak;
    let days = prev.days || 0;

    if (prev.lastPaint === today) {
      return { days, milestone: null };
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (prev.lastPaint === yesterday) {
      days += 1;
    } else {
      days = 1;
    }

    state.streak = { days, lastPaint: today };
    localStorage.setItem(STORAGE_KEYS.streak, JSON.stringify(state.streak));
    el.streakCount.textContent = days;

    const milestones = { 3: 2, 7: 5, 14: 10, 30: 25 };
    let milestone = null;
    if (milestones[days]) {
      const bonus = milestones[days];
      state.quota.adUnlocked += bonus;
      saveQuota();
      milestone = `${days}-day streak! +${bonus} pages`;
    }
    return { days, milestone };
  }

  /* */

  const bgCtx = el.bgCanvas.getContext("2d");
  const drawCtx = el.drawCanvas.getContext("2d", { willReadFrequently: true });
  const overCtx = el.overlayCanvas.getContext("2d");

  function resizeCanvases() {
    const rect = el.canvasStack.getBoundingClientRect();
    const w = Math.max(300, Math.floor(rect.width));
    const h = Math.max(300, Math.floor(rect.height));
    const dpr = state.dpr;

    state.canvasW = w;
    state.canvasH = h;

    [el.bgCanvas, el.drawCanvas, el.overlayCanvas].forEach((c) => {
      c.style.width = w + "px";
      c.style.height = h + "px";
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
    });

    [bgCtx, drawCtx, overCtx].forEach((g) => {
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    });

    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";

    if (state.currentScene) {
      renderSceneToBg(state.currentScene);
      renderLayers();
    }
  }

  /* */

  /**
   * Render a scene's line art onto the bg canvas.
   * Tries to load ./scenes/<id>.svg first.
   * If that fails, draws a procedural placeholder.
   */
  function renderSceneToBg(scene) {
    const dpr = state.dpr;
    bgCtx.clearRect(0, 0, state.canvasW, state.canvasH);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const w = state.canvasW;
      const h = state.canvasH;
      const s = Math.min(w / img.width, h / img.height) * 0.9;
      const dw = img.width * s;
      const dh = img.height * s;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      bgCtx.drawImage(img, dx, dy, dw, dh);
    };

    img.onerror = () => {
      // Fallback procedural art
      drawProceduralScene(scene);
    };

    if (scene.imageUrl) {
  img.src = scene.imageUrl; // It's an AI image!
} else {
  img.src = CONFIG.SCENES_BASE + scene.id + ".svg"; // It's a local SVG
}
  }

  function drawProceduralScene(scene) {
    const w = state.canvasW;
    const h = state.canvasH;

    bgCtx.save();
    bgCtx.strokeStyle = "#111";
    bgCtx.lineWidth = 2.5;
    bgCtx.lineCap = "round";
    bgCtx.lineJoin = "round";

    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.32;

    bgCtx.beginPath();
    bgCtx.arc(cx, cy, r, 0, Math.PI * 2);
    bgCtx.stroke();

    if (scene.category === "animals") {
      // Face
      bgCtx.beginPath();
      bgCtx.arc(cx - r * 0.3, cy - r * 0.2, r * 0.12, 0, Math.PI * 2);
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.arc(cx + r * 0.3, cy - r * 0.2, r * 0.12, 0, Math.PI * 2);
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.arc(cx, cy + r * 0.2, r * 0.35, 0.2, Math.PI - 0.2);
      bgCtx.stroke();
      // Ears
      bgCtx.beginPath();
      bgCtx.moveTo(cx - r * 0.6, cy - r * 0.5);
      bgCtx.lineTo(cx - r * 0.9, cy - r * 0.9);
      bgCtx.lineTo(cx - r * 0.2, cy - r * 0.7);
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.moveTo(cx + r * 0.6, cy - r * 0.5);
      bgCtx.lineTo(cx + r * 0.9, cy - r * 0.9);
      bgCtx.lineTo(cx + r * 0.2, cy - r * 0.7);
      bgCtx.stroke();
    } else if (scene.category === "food") {
      bgCtx.beginPath();
      bgCtx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
      bgCtx.stroke();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        bgCtx.beginPath();
        bgCtx.arc(cx + Math.cos(a) * r * 0.35, cy + Math.sin(a) * r * 0.35, r * 0.15, 0, Math.PI * 2);
        bgCtx.stroke();
      }
    } else if (scene.category === "places") {
      bgCtx.beginPath();
      bgCtx.rect(cx - r * 0.6, cy - r * 0.3, r * 1.2, r * 0.9);
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.moveTo(cx - r * 0.7, cy - r * 0.3);
      bgCtx.lineTo(cx, cy - r * 0.9);
      bgCtx.lineTo(cx + r * 0.7, cy - r * 0.3);
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.rect(cx - r * 0.1, cy + r * 0.3, r * 0.2, r * 0.3);
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.rect(cx - r * 0.45, cy - r * 0.1, r * 0.15, r * 0.15);
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.rect(cx + r * 0.3, cy - r * 0.1, r * 0.15, r * 0.15);
      bgCtx.stroke();
    } else {
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        bgCtx.beginPath();
        bgCtx.ellipse(
          cx + Math.cos(a) * r * 0.5,
          cy + Math.sin(a) * r * 0.5,
          r * 0.3, r * 0.15,
          a, 0, Math.PI * 2
        );
        bgCtx.stroke();
      }
      bgCtx.beginPath();
      bgCtx.arc(cx, cy, r * 0.2, 0, Math.PI * 2);
      bgCtx.stroke();
    }

    bgCtx.font = "500 14px system-ui, sans-serif";
    bgCtx.fillStyle = "#8b90a8";
    bgCtx.textAlign = "center";
    bgCtx.fillText(scene.emoji + " " + scene.title, cx, h - 30);

    bgCtx.restore();
  }

  /* */
     function makeLayer(name = "Layer 1") {
    return {
      id: uid(),
      name,
      opacity: 1,
      visible: true,
      canvas: (() => {
        const c = document.createElement("canvas");
        c.width = state.canvasW * state.dpr;
        c.height = state.canvasH * state.dpr;
        const ctx = c.getContext("2d");
        ctx.scale(state.dpr, state.dpr);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        return c;
      })(),
    };
  }

  function initLayers() {
    state.layers = [makeLayer("Layer 1")];
    state.activeLayerId = state.layers[0].id;
    renderLayerList();
    compositeLayers();
  }

  function activeLayer() {
    return state.layers.find((l) => l.id === state.activeLayerId);
  }

  function renderLayers() {
    state.layers.forEach((l) => {
      const c = l.canvas;
      const old = document.createElement("canvas");
      old.width = c.width;
      old.height = c.height;
      old.getContext("2d").drawImage(c, 0, 0);

      c.width = state.canvasW * state.dpr;
      c.height = state.canvasH * state.dpr;
      const ctx = c.getContext("2d");
      ctx.scale(state.dpr, state.dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.drawImage(old, 0, 0, old.width / state.dpr, old.height / state.dpr);
    });
    compositeLayers();
  }

  function compositeLayers() {
    drawCtx.clearRect(0, 0, state.canvasW, state.canvasH);
    for (const l of state.layers) {
      if (!l.visible) continue;
      drawCtx.globalAlpha = l.opacity;
      drawCtx.drawImage(l.canvas, 0, 0, state.canvasW, state.canvasH);
    }
    drawCtx.globalAlpha = 1;
  }

  function renderLayerList() {
    el.layerList.innerHTML = "";
    [...state.layers].reverse().forEach((l) => {
      const div = document.createElement("div");
      div.className = "layer-item" + (l.id === state.activeLayerId ? " active" : "");
      div.innerHTML = `
        <input type="checkbox" ${l.visible ? "checked" : ""} />
        <span class="layer-name">${escapeHtml(l.name)}</span>
        <button title="Delete">✕</button>
      `;
      div.querySelector("input").addEventListener("change", (e) => {
        l.visible = e.target.checked;
        compositeLayers();
      });
      div.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        if (state.layers.length <= 1) return;
        state.layers = state.layers.filter((x) => x.id !== l.id);
        if (state.activeLayerId === l.id) {
          state.activeLayerId = state.layers[0].id;
        }
        renderLayerList();
        compositeLayers();
      });
      div.addEventListener("click", () => {
        state.activeLayerId = l.id;
        renderLayerList();
      });
      el.layerList.appendChild(div);
    });
  }

  /* */

  function getPos(e) {
    const rect = el.drawCanvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return {
      x: p.clientX - rect.left,
      y: p.clientY - rect.top,
    };
  }

  function pushHistory() {
    const layer = activeLayer();
    if (!layer) return;
    try {
      const snap = layer.canvas.toDataURL();
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push(snap);
      if (state.history.length > CONFIG.HISTORY_LIMIT) {
        state.history.shift();
      }
      state.historyIndex = state.history.length - 1;
    } catch (e) {
      /* */
    }
  }

  function restoreHistory(snap) {
    return new Promise((resolve) => {
      const layer = activeLayer();
      if (!layer) return resolve();
      const img = new Image();
      img.onload = () => {
        const ctx = layer.canvas.getContext("2d");
        ctx.clearRect(0, 0, state.canvasW, state.canvasH);
        ctx.drawImage(img, 0, 0, state.canvasW, state.canvasH);
        compositeLayers();
        resolve();
      };
      img.src = snap;
    });
  }

  function startDraw(e) {
    e.preventDefault();
    if (!state.currentScene) {
      toast("Pick a scene first");
      return;
    }
    const layer = activeLayer();
    if (!layer) return;

    if (state.tool === "fill") {
      const { x, y } = getPos(e);
      pushHistory();
      floodFill(layer, Math.floor(x), Math.floor(y));
      compositeLayers();
      recordPaintingAction();
      return;
    }

    state.drawing = true;
    state.lastPoint = getPos(e);
    pushHistory();
  }

  function moveDraw(e) {
    if (!state.drawing) return;
    e.preventDefault();
    const layer = activeLayer();
    if (!layer) return;
    const ctx = layer.canvas.getContext("2d");
    const p = getPos(e);

    ctx.globalCompositeOperation =
      state.tool === "eraser" ? "destination-out" : "source-over";
    ctx.strokeStyle = hexToRgba(state.color, state.opacity);
    ctx.lineWidth = state.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(state.lastPoint.x, state.lastPoint.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();

    state.lastPoint = p;
    compositeLayers();
  }

  function endDraw() {
    if (!state.drawing) return;
    state.drawing = false;
    state.lastPoint = null;
    compositeLayers();
    recordPaintingAction();
  }

  function recordPaintingAction() {
    const result = recordStreak();
    if (result.milestone) {
      toast(result.milestone, 3000);
    }
  }

  /* */

  function floodFill(layer, x, y) {
    const canvas = layer.canvas;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const w = canvas.width;
    const h = canvas.height;
    const dpr = state.dpr;
    const px = Math.floor(x * dpr);
    const py = Math.floor(y * dpr);
    if (px < 0 || py < 0 || px >= w || py >= h) return;

    const bgW = el.bgCanvas.width;
    const bgH = el.bgCanvas.height;
    const bgData = bgCtx.getImageData(0, 0, bgW, bgH).data;

    const edge = new Uint8Array(bgW * bgH);
    for (let i = 0, p = 0; i < bgData.length; i += 4, p++) {
      const a = bgData[i + 3];
      if (a < 20) continue;
      const lum = 0.299 * bgData[i] + 0.587 * bgData[i + 1] + 0.114 * bgData[i + 2];
      if (lum < 128) edge[p] = 1;
    }

    const dilated = new Uint8Array(edge.length);
    for (let yy = 0; yy < bgH; yy++) {
      for (let xx = 0; xx < bgW; xx++) {
        const i = yy * bgW + xx;
        if (edge[i]) {
          dilated[i] = 1;
          if (xx > 0) dilated[i - 1] = 1;
          if (xx < bgW - 1) dilated[i + 1] = 1;
          if (yy > 0) dilated[i - bgW] = 1;
          if (yy < bgH - 1) dilated[i + bgW] = 1;
        }
      }
    }

    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;
    const idx = (X, Y) => (Y * w + X) * 4;
    const start = idx(px, py);
    const sr = data[start], sg = data[start + 1], sb = data[start + 2], sa = data[start + 3];

    const hex = state.color.replace("#", "");
    const tr = parseInt(hex.slice(0, 2), 16);
    const tg = parseInt(hex.slice(2, 4), 16);
    const tb = parseInt(hex.slice(4, 6), 16);
    const ta = Math.round(state.opacity * 255);

    if (Math.abs(sr - tr) < 3 && Math.abs(sg - tg) < 3 && Math.abs(sb - tb) < 3 && Math.abs(sa - ta) < 3) return;

    const tol = 40;
    const matches = (i) =>
      Math.abs(data[i] - sr) <= tol &&
      Math.abs(data[i + 1] - sg) <= tol &&
      Math.abs(data[i + 2] - sb) <= tol &&
      Math.abs(data[i + 3] - sa) <= tol;
      const stack = [px + py * w];
    const visited = new Uint8Array(w * h);

    const bgW_scaled = Math.floor(bgW);
    const scaleX = w / bgW_scaled;
    const scaleY = h / Math.floor(bgH);

    while (stack.length) {
      const p = stack.pop();
      if (visited[p]) continue;
      visited[p] = 1;

      const X = p % w;
      const Y = (p - X) / w;

      const bX = Math.floor(X / scaleX);
      const bY = Math.floor(Y / scaleY);
      if (bX >= 0 && bX < bgW && bY >= 0 && bY < bgH) {
        if (dilated[bY * bgW + bX]) continue;
      }

      if (!matches(idx(X, Y))) continue;

      const i = idx(X, Y);
      data[i] = tr;
      data[i + 1] = tg;
      data[i + 2] = tb;
      data[i + 3] = ta;

      if (X > 0) stack.push(p - 1);
      if (X < w - 1) stack.push(p + 1);
      if (Y > 0) stack.push(p - w);
      if (Y < h - 1) stack.push(p + w);
    }

    ctx.putImageData(imgData, 0, 0);
  }

  /* */

  function renderCountrySelect() {
    el.countrySelect.innerHTML = "";
    COUNTRIES.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.code;
      opt.textContent = `${c.flag} ${c.name}`;
      if (c.code === state.country) opt.selected = true;
      el.countrySelect.appendChild(opt);
    });
  }

  function renderCategoryTabs() {
    el.categoryTabs.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "cat-tab" + (cat.id === state.category ? " active" : "");
      btn.innerHTML = `<span>${cat.emoji}</span> ${escapeHtml(cat.title)}`;
      btn.addEventListener("click", () => {
        state.category = cat.id;
        renderCategoryTabs();
        renderSceneGrid();
      });
      el.categoryTabs.appendChild(btn);
    });
  }

  function scenesForCategory() {
    return SCENES.filter(
      (s) => s.country === state.country && s.category === state.category
    );
  }

  function renderSceneGrid() {
    const list = scenesForCategory();
    el.sceneGrid.innerHTML = "";
    el.sceneGridTitle.textContent = CATEGORIES.find((c) => c.id === state.category)?.title || "Scenes";
    el.sceneCount.textContent = `${list.length} scene${list.length === 1 ? "" : "s"}`;

    if (list.length === 0) {
      const empty = document.createElement("div");
      empty.className = "muted small";
      empty.style.gridColumn = "1 / -1";
      empty.style.textAlign = "center";
      empty.style.padding = "20px 8px";
      empty.textContent = "No scenes in this category yet. Try another!";
      el.sceneGrid.appendChild(empty);
      return;
    }

    list.forEach((scene) => {
      const btn = document.createElement("button");
      btn.className = "scene-card" + (state.currentScene?.id === scene.id ? " active" : "");
      btn.innerHTML = `
        <div class="scene-emoji">${scene.emoji}</div>
        <div class="scene-title">${escapeHtml(scene.title)}</div>
      `;
      btn.addEventListener("click", () => pickScene(scene));
      el.sceneGrid.appendChild(btn);
    });
  }

  function pickScene(scene) {
    state.currentScene = scene;
    el.emptyState.classList.add("hidden");

    showLoading("Loading scene…");
    setTimeout(() => {
      renderSceneToBg(scene);
      initLayers();
      hideLoading();
      pushHistory();
      renderSceneGrid();
      toast(`${scene.emoji} ${scene.title} — start coloring!`);
    }, 200);
  }

  /* */

  async function generateWithAI(prompt) {
  if (!prompt.trim()) {
    toast("Type what you want first");
    return;
  }

  if (!consumeQuota()) {
    openPaywall();
    return;
  }

  const token = localStorage.getItem("cv_token");
  if (!token) {
    toast("Please log in to use AI generation");
    openAuthModal();
    state.quota.freeUsed = Math.max(0, state.quota.freeUsed - 1);
    saveQuota();
    return;
  }

  showLoading("Generating AI magic... (takes ~10s)");
  el.aiStatus.textContent = "Working...";

  try {
    const res = await fetch(`${CONFIG.API_BASE}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Generation failed");

    const scene = {
      id: "ai-" + uid(),
      country: state.country,
      category: "custom",
      emoji: "✨",
      title: prompt.slice(0, 30),
      isAI: true,
      prompt,
      imageUrl: data.imageUrl
    };

    state.currentScene = scene;
    el.emptyState.classList.add("hidden");
    
    showLoading("Loading AI image...");
    
    // Load the real image onto the canvas
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      initLayers();
      const w = state.canvasW;
      const h = state.canvasH;
      const s = Math.min(w / img.width, h / img.height) * 0.9;
      const dw = img.width * s, dh = img.height * s;
      const dx = (w - dw) / 2, dy = (h - dh) / 2;
      
      bgCtx.clearRect(0, 0, w, h);
      bgCtx.drawImage(img, dx, dy, dw, dh);
      // hide the watermark strip at the bottom of the image
bgCtx.fillStyle = "#ffffff";
bgCtx.fillRect(dx, dy + dh * 0.93, dw, dh * 0.07);

// convert to outlines (edge detection)
const cw = el.bgCanvas.width, ch = el.bgCanvas.height;
const src = bgCtx.getImageData(0, 0, cw, ch).data;
const gray = new Float32Array(cw * ch);
for (let i = 0, p = 0; i < src.length; i += 4, p++) {
  gray[p] = 0.299 * src[i] + 0.587 * src[i + 1] + 0.114 * src[i + 2];
}
const out = bgCtx.createImageData(cw, ch);
out.data.fill(255);
for (let y = 1; y < ch - 1; y++) {
  for (let x = 1; x < cw - 1; x++) {
    const p = y * cw + x;
    const gx = -gray[p - cw - 1] - 2 * gray[p - 1] - gray[p + cw - 1] +
                gray[p - cw + 1] + 2 * gray[p + 1] + gray[p + cw + 1];
    const gy = -gray[p - cw - 1] - 2 * gray[p - cw] - gray[p - cw + 1] +
                gray[p + cw - 1] + 2 * gray[p + cw] + gray[p + cw + 1];
    if (Math.sqrt(gx * gx + gy * gy) > 60) {
      const i = p * 4;
      out.data[i] = out.data[i + 1] = out.data[i + 2] = 0;
    }
  }
}
bgCtx.putImageData(out, 0, 0);
      
      hideLoading();
      pushHistory();
      el.aiStatus.textContent = "Done!";
      toast("✨ AI scene ready");
      
      const r = recordStreak();
      if (r.milestone) toast(r.milestone, 3000);
    };
    img.onerror = () => {
      hideLoading();
      toast("Failed to load image from AI");
    };
    img.src = data.imageUrl;

  } catch (err) {
    console.error(err);
    el.aiStatus.textContent = "Failed";
    toast(err.message || "Generation failed");
    state.quota.freeUsed = Math.max(0, state.quota.freeUsed - 1);
    saveQuota();
    hideLoading();
  } finally {
    setTimeout(() => { el.aiStatus.textContent = ""; }, 3000);
  }
}

  /* */

  function exportCompositeCanvas() {
    const out = document.createElement("canvas");
    out.width = state.canvasW * state.dpr;
    out.height = state.canvasH * state.dpr;
    const ctx = out.getContext("2d");
    ctx.scale(state.dpr, state.dpr);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, state.canvasW, state.canvasH);

    ctx.drawImage(el.bgCanvas, 0, 0, state.canvasW, state.canvasH);

    ctx.drawImage(el.drawCanvas, 0, 0, state.canvasW, state.canvasH);

    return out;
  }

  function saveArtwork() {
    if (!state.currentScene) {
      toast("Nothing to save yet — pick a scene first");
      return;
    }
    const out = exportCompositeCanvas();
    const link = document.createElement("a");
    link.download = `colorverse-${Date.now()}.png`;
    link.href = out.toDataURL("image/png");
    link.click();
    toast("💾 Saved to downloads");
  }

  /* */

  function openPaywall() {
    el.paywall.classList.remove("hidden");
  }

  function closePaywall() {
    el.paywall.classList.add("hidden");
  }

  function openShare() {
    if (!state.currentScene) {
      toast("Paint something first");
      return;
    }
    el.shareModal.classList.remove("hidden");
    // reset
    el.shareReady.classList.add("hidden");
    el.shareLink.classList.add("hidden");
    el.shareUnlock.disabled = false;
    el.shareUnlock.textContent = "▶ Unlock sharing (15s ad)";
    el.shareSub.textContent = "Watch a quick ad to unlock sharing.";
  }

  function closeShare() {
    el.shareModal.classList.add("hidden");
  }

  function unlockShare() {
    el.shareUnlock.disabled = true;
    el.shareUnlock.textContent = "Playing ad…";

    setTimeout(() => {
      const fakeId = uid();
      const url = `${window.location.origin}${window.location.pathname}#share=${fakeId}`;

      el.shareLink.textContent = url;
      el.shareLink.classList.remove("hidden");
      el.shareReady.classList.remove("hidden");
      el.shareSub.textContent = "Unlocked! Pick where to share.";
      el.shareUnlock.textContent = "✅ Unlocked";
    }, 2000);
  }

  /* */

  function renderMusicChannels() {
    el.musicChannels.innerHTML = "";
    MUSIC_CHANNELS.forEach((ch) => {
      const btn = document.createElement("button");
      btn.className = "music-channel" + (state.music.channel === ch.id ? " active" : "");
      btn.innerHTML = `<span>${ch.emoji}</span> ${escapeHtml(ch.title)}`;
      btn.addEventListener("click", () => toggleChannel(ch.id));
      el.musicChannels.appendChild(btn);
    });
    updateMusicToggle();
  }
  function toggleChannel(id) {
    if (state.music.channel === id && state.music.playing) {
      stopMusic();
      return;
    }

    state.music.channel = id;
    startMusic(id);
    renderMusicChannels();
  }

  function startMusic(id) {
    stopMusic();
    const ch = MUSIC_CHANNELS.find((c) => c.id === id);
    if (!ch) return;

    const audio = new Audio(CONFIG.MUSIC_BASE + ch.file);
    audio.loop = true;
    audio.volume = 0.35;

    audio.play()
      .then(() => {
        state.music.audio = audio;
        state.music.playing = true;
        updateMusicToggle();
      })
      .catch(() => {
        toast("Music file not found — add one in /music/" + ch.file);
        state.music.playing = false;
        updateMusicToggle();
      });
  }

  function stopMusic() {
    if (state.music.audio) {
      state.music.audio.pause();
      state.music.audio.src = "";
    }
    state.music.audio = null;
    state.music.playing = false;
    updateMusicToggle();
  }

  function updateMusicToggle() {
    el.musicToggle.textContent = state.music.playing ? "⏸ Pause music" : "▶ Play music";
  }

  /* */

  function renderSwatches() {
    el.swatches.innerHTML = "";
    PALETTE.forEach((c) => {
      const sw = document.createElement("div");
      sw.className = "swatch" + (c === state.color ? " active" : "");
      sw.style.background = c;
      sw.addEventListener("click", () => {
        state.color = c;
        el.color.value = c;
        renderSwatches();
      });
      el.swatches.appendChild(sw);
    });
  }

  function bindEvents() {
    el.drawCanvas.addEventListener("mousedown", startDraw);
    el.drawCanvas.addEventListener("mousemove", moveDraw);
    window.addEventListener("mouseup", endDraw);
    el.drawCanvas.addEventListener("touchstart", startDraw, { passive: false });
    el.drawCanvas.addEventListener("touchmove", moveDraw, { passive: false });
    el.drawCanvas.addEventListener("touchend", endDraw);

    document.querySelectorAll(".tool").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tool").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.tool = btn.dataset.tool;
      });
    });

    el.size.addEventListener("input", () => {
      state.size = +el.size.value;
      el.sizeLabel.textContent = el.size.value;
    });
    el.opacity.addEventListener("input", () => {
      state.opacity = +el.opacity.value / 100;
      el.opacityLabel.textContent = el.opacity.value;
    });
    el.color.addEventListener("input", () => {
      state.color = el.color.value;
      renderSwatches();
    });

    el.btnUndo.addEventListener("click", async () => {
      if (state.historyIndex <= 0) return;
      state.historyIndex -= 1;
      await restoreHistory(state.history[state.historyIndex]);
    });
    el.btnRedo.addEventListener("click", async () => {
      if (state.historyIndex >= state.history.length - 1) return;
      state.historyIndex += 1;
      await restoreHistory(state.history[state.historyIndex]);
    });
    el.btnClear.addEventListener("click", () => {
      const layer = activeLayer();
      if (!layer) return;
      pushHistory();
      layer.canvas.getContext("2d").clearRect(0, 0, state.canvasW, state.canvasH);
      compositeLayers();
      toast("Cleared");
    });

    el.btnSave.addEventListener("click", saveArtwork);
    el.btnShare.addEventListener("click", openShare);
    el.shareUnlock.addEventListener("click", unlockShare);
    el.shareClose.addEventListener("click", closeShare);
    el.paywallAd.addEventListener("click", () => {
      el.paywallAd.disabled = true;
      el.paywallAd.textContent = "Playing ad…";
      setTimeout(() => {
        grantAdReward();
        el.paywallAd.disabled = false;
        el.paywallAd.textContent = "▶ Watch ad for +1 page";
        closePaywall();
        toast("✅ +1 page unlocked");
      }, 2000);
    });
    el.paywallClose.addEventListener("click", closePaywall);

    document.querySelectorAll(".tier").forEach((t) => {
      t.querySelector("button").addEventListener("click", () => {
        const tier = t.dataset.tier;
        toast(`💳 Subscribe to ${tier} — coming soon`);
        closePaywall();
      });
    });

    el.countrySelect.addEventListener("change", () => {
      state.country = el.countrySelect.value;
      const c = COUNTRIES.find((x) => x.code === state.country);
      el.countryFlag.textContent = c.flag;
      el.countryLabel.textContent = c.name;
      renderSceneGrid();
    });

    el.aiGenerate.addEventListener("click", () => {
      generateWithAI(el.aiPrompt.value);
    });

    el.musicToggle.addEventListener("click", () => {
      if (state.music.playing) stopMusic();
      else if (state.music.channel) startMusic(state.music.channel);
      else toggleChannel(MUSIC_CHANNELS[0].id);
    });

    el.layerAdd.addEventListener("click", () => {
      state.layers.push(makeLayer(`Layer ${state.layers.length + 1}`));
      state.activeLayerId = state.layers[state.layers.length - 1].id;
      renderLayerList();
      compositeLayers();
    });

    document.querySelector(".share-wa").addEventListener("click", () => {
      const url = el.shareLink.textContent;
      window.open(`https://wa.me/?text=${encodeURIComponent("Check my ColorVerse painting! " + url)}`, "_blank");
    });
    document.querySelector(".share-tt").addEventListener("click", async () => {
      await navigator.clipboard.writeText(el.shareLink.textContent);
      toast("Link copied — paste it in your TikTok caption");
      window.open("https://www.tiktok.com/upload?lang=en&refer=web", "_blank");
    });
    document.querySelector(".share-copy").addEventListener("click", async () => {
      await navigator.clipboard.writeText(el.shareLink.textContent);
      toast("Link copied");
    });

    window.addEventListener("resize", () => {
      clearTimeout(window.__resizeTimer);
      window.__resizeTimer = setTimeout(resizeCanvases, 150);
    });

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) el.btnRedo.click();
        else el.btnUndo.click();
      }
      if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        saveArtwork();
      }
    });
  }

  /* */

let isSignUpMode = false;
let currentUser = null;

function updateAuthUI() {
  if (currentUser) {
    el.btnAuth.innerHTML = `👤 ${currentUser.email.split('@')[0]}`;
    el.btnAuth.classList.remove("primary");
    el.btnAuth.classList.add("ghost");
  } else {
    el.btnAuth.innerHTML = "👤 Sign In";
    el.btnAuth.classList.add("primary");
    el.btnAuth.classList.remove("ghost");
  }
}

function openAuthModal() {
  el.authModal.classList.remove("hidden");
  el.authError.classList.add("hidden");
  el.authEmail.value = "";
  el.authPassword.value = "";
}

function closeAuthModal() {
  el.authModal.classList.add("hidden");
}

el.btnAuth.addEventListener("click", () => {
  if (currentUser) {
    if (confirm("Do you want to log out?")) {
      localStorage.removeItem("cv_token");
      currentUser = null;
      updateAuthUI();
      toast("Logged out");
    }
  } else {
    openAuthModal();
  }
});

el.authClose.addEventListener("click", closeAuthModal);

el.authSwitchBtn.addEventListener("click", () => {
  isSignUpMode = !isSignUpMode;
  el.authTitle.textContent = isSignUpMode ? "Create an Account" : "Welcome Back";
  el.authSub.textContent = isSignUpMode ? "Save your paintings to the cloud." : "Sign in to access your gallery.";
  el.authSubmit.textContent = isSignUpMode ? "Sign Up" : "Sign In";
  el.authSwitchText.textContent = isSignUpMode ? "Already have an account?" : "Don't have an account?";
  el.authSwitchBtn.textContent = isSignUpMode ? "Log in" : "Sign up";
  el.authError.classList.add("hidden");
});

el.authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  el.authSubmit.disabled = true;
  el.authSubmit.textContent = "Loading...";
  el.authError.classList.add("hidden");

  const endpoint = isSignUpMode ? "/signup" : "/login";
  
  try {
    const response = await fetch(`${CONFIG.API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: el.authEmail.value,
        password: el.authPassword.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    localStorage.setItem("cv_token", data.token);
    currentUser = { email: data.email };
    updateAuthUI();
    closeAuthModal();
    toast(`Welcome, ${data.email.split('@')[0]}! 🎉`);

  } catch (err) {
    el.authError.textContent = err.message;
    el.authError.classList.remove("hidden");
  } finally {
    el.authSubmit.disabled = false;
    el.authSubmit.textContent = isSignUpMode ? "Sign Up" : "Sign In";
  }
});

async function checkExistingSession() {
  const token = localStorage.getItem("cv_token");
  if (!token) return;

  try {
    const res = await fetch(`${CONFIG.API_BASE}/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      currentUser = { email: data.email };
      updateAuthUI();
    } else {
      localStorage.removeItem("cv_token");
    }
  } catch (e) {
    console.warn("Could not verify session");
  }
}

/* */

  function init() {
    state.quota = loadQuota();
    state.streak = loadStreak();
    checkExistingSession();

    el.streakCount.textContent = state.streak.days || 0;
    updateQuotaBadge();

    const country = COUNTRIES.find((c) => c.code === state.country);
    el.countryFlag.textContent = country.flag;
    el.countryLabel.textContent = country.name;

    renderCountrySelect();
    renderCategoryTabs();
    renderSceneGrid();
    renderSwatches();
    renderMusicChannels();
    renderLayerList();

    resizeCanvases();
    initLayers();

    bindEvents();

    el.challengeCard.classList.remove("hidden");
    el.chEmoji.textContent = "🌅";
    el.chName.textContent = "Lagos Sunset";
    el.chMeta.textContent = "Paint today's challenge · +3 bonus pages";
    el.chStart.addEventListener("click", () => {
      el.aiPrompt.value = "Lagos skyline at sunset, palm trees, danfo buses on a bridge";
      generateWithAI(el.aiPrompt.value);
    });

    if (!state.quota.freeUsed) {
      setTimeout(() => toast("Welcome to ColorVerse! Pick a scene to start 🎨", 3000), 800);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  

})();