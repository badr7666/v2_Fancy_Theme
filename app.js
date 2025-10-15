/* =========================
   v2 – Branch Dashboard (same as LANA, branded v2)
   ========================= */

// ======= I18N =======
const i18n = {
  ar: {
    tabDashboard: "الصفحة الرئيسية",
    tabAdd: "أضف فرع",
    tabBranches: "تعديل الفروع",
    tabFiles: "ملفات",
    tabSettings: "الإعدادات",
    heroTitle: "تفاعل الفروع (تحديث كل دقيقة)",
    heroSubtitle: "يعرض متوسط التقييم وعدد التعليقات لكل فرع + مقارنة قبل/بعد ضمن النطاق الزمني.",
    lblFrom: "من",
    lblTo: "إلى",
    btnWeek: "أسبوع",
    btnMonth: "شهر",
    btnApply: "تطبيق الفلاتر",
    lblTarget: "هدف التقييم",
    btnRecalculate: "إعادة حساب النقاط",
    tblTitle: "جدول الفروع",
    thName: "اسم الفرع",
    thRating: "التقييم الحالي",
    thReviews: "عدد التعليقات",
    thBefore: "قبل (متوسط/تعليقات)",
    thAfter: "بعد (متوسط/تعليقات)",
    thChange: "التغير",
    thToTarget: "للوصول للهدف",
    addTitle: "إضافة فرع جديد",
    lblBranchName: "اسم الفرع",
    lblMapsUrl: "رابط Google Maps",
    sumWhyPlaceId: "ليش نستخدم Place ID؟",
    hintPlaceId: `
      الجلب الآلي (التقييم + عدد التعليقات) يعتمد على Google Places API،
      وهذا يحتاج <b>place_id</b>. تقدر تجلبه من Google Place ID Finder،
      أو تحفظه لاحقًا من صفحة "تعديل الفروع". بدون place_id يشتغل وضع يدوي.
    `,
    lblPlaceId: "Place ID (اختياري)",
    btnAddBranch: "إضافة",
    btnResolvePlaceId: "محاولة استخراج Place ID",
    branchesTitle: "قائمة الفروع (تعديل/حذف)",
    filesTitle: "تصدير التقارير",
    lblExportFrom: "من",
    lblExportTo: "إلى",
    btnExportCsv: "تنزيل CSV",
    exportNote: "التقرير يعتمد على اللقطات المخزنة أثناء التحديثات.",
    settingsTitle: "الإعدادات",
    lblApiKey: "مفتاح Google API (Maps + Places)",
    lblRefresh: "دقائق التحديث",
    btnSaveSettings: "حفظ الإعدادات",
    btnTestFetch: "اختبار تحديث الآن",
    settingsTips: "بعد حفظ المفتاح، فعّل سكربت Google Maps في index.html أو استخدم عنواناً ديناميكياً.",
    footerText: "v2 · صنع بحب 💙",
    langToggle: "EN",
    themeToggleDark: "نهار",
    themeToggleLight: "ليل",
    liveOn: "يحدّث الآن",
    liveOff: "تحديث يدوي",
    points: "نقطة/تعليق",
    need: "تحتاج",
    reach: "للوصول إلى",
    before: "قبل",
    after: "بعد",
    noData: "—",
    delete: "حذف",
    save: "حفظ",
    update: "تحديث",
    manualHint: "وضع يدوي (بدون API): يمكنك تعديل الأرقام يدوياً.",
  },
  en: {
    tabDashboard: "Dashboard",
    tabAdd: "Add Branch",
    tabBranches: "Edit Branches",
    tabFiles: "Files / Export",
    tabSettings: "Settings",
    heroTitle: "Branch Engagement (updates every minute)",
    heroSubtitle: "Average rating & reviews per branch + before/after comparison for selected range.",
    lblFrom: "From",
    lblTo: "To",
    btnWeek: "Week",
    btnMonth: "Month",
    btnApply: "Apply Filters",
    lblTarget: "Target Rating",
    btnRecalculate: "Recalculate",
    tblTitle: "Branches Table",
    thName: "Branch",
    thRating: "Current Rating",
    thReviews: "Reviews",
    thBefore: "Before (avg/rev)",
    thAfter: "After (avg/rev)",
    thChange: "Change",
    thToTarget: "To target",
    addTitle: "Add New Branch",
    lblBranchName: "Branch Name",
    lblMapsUrl: "Google Maps URL",
    sumWhyPlaceId: "Why Place ID?",
    hintPlaceId: `
      Auto-fetch (rating + reviews) uses Google Places API, which needs a <b>place_id</b>.
      Get it via Google Place ID Finder, or fill it later in “Edit Branches”.
      Without a place_id, manual mode works fine.
    `,
    lblPlaceId: "Place ID (optional)",
    btnAddBranch: "Add",
    btnResolvePlaceId: "Try Resolve Place ID",
    branchesTitle: "Branches (Edit/Delete)",
    filesTitle: "Export Reports",
    lblExportFrom: "From",
    lblExportTo: "To",
    btnExportCsv: "Download CSV",
    exportNote: "Report is based on stored snapshots from updates.",
    settingsTitle: "Settings",
    lblApiKey: "Google API Key (Maps + Places)",
    lblRefresh: "Refresh Minutes",
    btnSaveSettings: "Save Settings",
    btnTestFetch: "Test Update Now",
    settingsTips: "After saving the key, enable the Google Maps script in index.html or inject dynamically.",
    footerText: "v2 · made with 💙",
    langToggle: "عربي",
    themeToggleDark: "Light",
    themeToggleLight: "Dark",
    liveOn: "Live",
    liveOff: "Manual",
    points: "points/reviews",
    need: "Need",
    reach: "to reach",
    before: "Before",
    after: "After",
    noData: "—",
    delete: "Delete",
    save: "Save",
    update: "Update",
    manualHint: "Manual mode (no API): you can edit numbers directly.",
  }
};

// ======= STATE & STORAGE =======
const LS_KEYS = {
  branches: "lanaBranches",
  settings: "lanaSettings",
  snapshots: "lanaSnapshots"
};

const appState = {
  lang: localStorage.getItem("lanaLang") || "ar",
  theme: localStorage.getItem("lanaTheme") || "dark",
  branches: [],
  settings: { apiKey: "", refreshMinutes: 1 },
  snapshots: {},
  placesService: null,
  liveTimer: null
};

const $ = (id) => document.getElementById(id);

// ======= INIT =======
document.addEventListener("DOMContentLoaded", () => {
  appState.branches = load(LS_KEYS.branches, []) ;
  appState.settings = load(LS_KEYS.settings, { apiKey: "", refreshMinutes: 1 });
  appState.snapshots = load(LS_KEYS.snapshots, {});
  applyTheme(appState.theme);
  setLang(appState.lang);

  if (appState.branches.length === 0) {
    seedInitialBranches();
    persist(LS_KEYS.branches, appState.branches);
  }

  bindUI();
  renderAll();
  setupLiveRefresh();
});

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function persist(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

// ======= SEED =======
function seedInitialBranches() {
  const seed = [
    { name: "ميدنايت – حي الريان", url: "https://maps.app.goo.gl/Q3H1p4VnCvLxms49A?g_st=ipc" },
    { name: "ميدنايت – حي المنار", url: "https://maps.app.goo.gl/MwExC9AUVVdhBpBC9?g_st=ipc" },
    { name: "محشومة – حي الريان", url: "https://maps.app.goo.gl/mdMWRATpTZJDpGX96?g_st=ipc" },
    { name: "محشومة – البكيرية", url: "https://maps.app.goo.gl/Tpb8kH6L2JZLGtEk8?g_st=ipc" },
    { name: "ساف – حي النهضة", url: "https://maps.app.goo.gl/ASKs8CmpQqbPW7qP8?g_st=ipc" },
    { name: "ساف – البكيرية", url: "https://maps.app.goo.gl/F96B6RV6JouXX6ed8?g_st=ipc" },
    { name: "ساف – حي الأخضر", url: "https://maps.app.goo.gl/c5dHZ1Ds5PQekn4D9?g_st=ipc" },
    { name: "ساف – حي الصفراء", url: "https://maps.app.goo.gl/gYXav2YS6rKSgS439?g_st=ipc" },
    { name: "ساف – حي القناة", url: "https://maps.app.goo.gl/KZS43eDtKfcWze8u5?g_st=ipc" },
    { name: "ساف – حي الفاخرية", url: "https://maps.app.goo.gl/LSU4bwUbrm5WSAko9?g_st=ipc" },
    { name: "ساف – حي الضاحي", url: "https://maps.app.goo.gl/4mC9iSUWEtkqit5C9?g_st=ipc" },
    { name: "مستر بروس – حي النهضة", url: "https://maps.app.goo.gl/aVALC5Ku12ka9iy96?g_st=ipc" },
  ];
  appState.branches = seed.map((b) => ({
    id: crypto.randomUUID(),
    name: b.name, url: b.url, placeId: "", rating: null, reviews: null
  }));
}

// ======= UI BINDINGS =======
function bindUI() {
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  $("btnWeek").onclick = () => presetRange(7);
  $("btnMonth").onclick = () => presetRange(30);
  $("btnApply").onclick = renderAll;
  $("btnRecalculate").onclick = renderAll;

  $("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("branchName").value.trim();
    const url = $("mapsUrl").value.trim();
    const placeId = $("placeId").value.trim();
    if (!name) return;
    appState.branches.push({ id: crypto.randomUUID(), name, url, placeId, rating:null, reviews:null });
    persist(LS_KEYS.branches, appState.branches);
    e.target.reset();
    alert(txt("save"));
    renderAll();
  });

  $("btnResolvePlaceId").onclick = tryResolvePlaceIdFromUrl;

  $("btnSaveSettings").onclick = () => {
    appState.settings.apiKey = $("apiKey").value.trim();
    appState.settings.refreshMinutes = Math.max(1, parseInt($("refreshMinutes").value || "1", 10));
    persist(LS_KEYS.settings, appState.settings);
    setupLiveRefresh();
    alert(txt("save"));
  };
  $("btnTestFetch").onclick = () => updateAllBranches(true);

  $("themeToggle").onclick = toggleTheme;
  $("langToggle").onclick = toggleLang;

  $("btnExportCsv").onclick = exportCsv;
}

function switchTab(tab) {
  document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  document.querySelectorAll("main .tab").forEach(s => s.classList.toggle("active", s.id === tab));
}

// ======= THEME & LANG =======
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "dark");
  $("themeToggle").textContent = theme === "light" ? txt("themeToggleLight") : txt("themeToggleDark");
  localStorage.setItem("lanaTheme", theme);
}
function toggleTheme() {
  appState.theme = (appState.theme === "light") ? "dark" : "light";
  applyTheme(appState.theme);
}

function setLang(lang) {
  appState.lang = (lang === "en" ? "en" : "ar");
  localStorage.setItem("lanaLang", appState.lang);
  $("tabDashboard").textContent = txt("tabDashboard");
  $("tabAdd").textContent = txt("tabAdd");
  $("tabBranches").textContent = txt("tabBranches");
  $("tabFiles").textContent = txt("tabFiles");
  $("tabSettings").textContent = txt("tabSettings");
  $("heroTitle").textContent = txt("heroTitle");
  $("heroSubtitle").innerHTML = txt("heroSubtitle");
  $("lblFrom").textContent = txt("lblFrom");
  $("lblTo").textContent = txt("lblTo");
  $("btnWeek").textContent = txt("btnWeek");
  $("btnMonth").textContent = txt("btnMonth");
  $("btnApply").textContent = txt("btnApply");
  $("lblTarget").textContent = txt("lblTarget");
  $("btnRecalculate").textContent = txt("btnRecalculate");
  $("tblTitle").textContent = txt("tblTitle");
  $("thName").textContent = txt("thName");
  $("thRating").textContent = txt("thRating");
  $("thReviews").textContent = txt("thReviews");
  $("thBefore").textContent = txt("thBefore");
  $("thAfter").textContent = txt("thAfter");
  $("thChange").textContent = txt("thChange");
  $("thToTarget").textContent = txt("thToTarget");
  $("addTitle").textContent = txt("addTitle");
  $("lblBranchName").textContent = txt("lblBranchName");
  $("lblMapsUrl").textContent = txt("lblMapsUrl");
  $("sumWhyPlaceId").textContent = txt("sumWhyPlaceId");
  $("hintPlaceId").innerHTML = txt("hintPlaceId");
  $("lblPlaceId").textContent = txt("lblPlaceId");
  $("btnAddBranch").textContent = txt("btnAddBranch");
  $("btnResolvePlaceId").textContent = txt("btnResolvePlaceId");
  $("branchesTitle").textContent = txt("branchesTitle");
  $("filesTitle").textContent = txt("filesTitle");
  $("lblExportFrom").textContent = txt("lblExportFrom");
  $("lblExportTo").textContent = txt("lblExportTo");
  $("btnExportCsv").textContent = txt("btnExportCsv");
  $("exportNote").textContent = txt("exportNote");
  $("settingsTitle").textContent = txt("settingsTitle");
  $("lblApiKey").textContent = txt("lblApiKey");
  $("lblRefresh").textContent = txt("lblRefresh");
  $("btnSaveSettings").textContent = txt("btnSaveSettings");
  $("btnTestFetch").textContent = txt("btnTestFetch");
  $("settingsTips").textContent = txt("settingsTips");
  $("footerText").textContent = txt("footerText");
  $("langToggle").textContent = txt("langToggle");
  document.documentElement.lang = appState.lang;
  document.documentElement.dir = (appState.lang === "ar") ? "rtl" : "ltr";
}
function toggleLang() { setLang(appState.lang === "ar" ? "en" : "ar"); renderAll(); }
function txt(key) { return i18n[appState.lang][key]; }

// ======= RENDER =======
function renderAll() {
  $("liveBadge").textContent = appState.settings.apiKey ? `• ${txt("liveOn")}` : `• ${txt("liveOff")}`;
  renderCardsAndTable();
  renderBranchesList();
  fillSettings();
}

function renderCardsAndTable() {
  const grid = $("branchesGrid");
  const tbody = $("branchesTbody");
  grid.innerHTML = "";
  tbody.innerHTML = "";

  const from = $("dateFrom").value ? new Date($("dateFrom").value) : null;
  const to = $("dateTo").value ? new Date($("dateTo").value) : null;
  const target = parseFloat($("targetRating").value || "4.2");

  appState.branches.forEach((b) => {
    const latest = getLatestSnapshot(b.id);
    const before = getSnapshotAt(b.id, from, "closestBefore");
    const after  = getSnapshotAt(b.id, to, "closestAfter");

    const card = document.createElement("div");
    card.className = "card";
    const currRating = (latest?.rating ?? b.rating);
    const currReviews = (latest?.reviews ?? b.reviews);
    const canAuto = appState.settings.apiKey && b.placeId;

    card.innerHTML = `
      <h4>${b.name}</h4>
      <div class="muted">${b.url ? `<a href="${b.url}" target="_blank">Google Maps</a>` : ""}</div>
      <p>${txt("thRating")}: <b>${fmt(currRating)}</b> — ${txt("thReviews")}: <b>${fmt(currReviews)}</b></p>
      <p><span class="badge ${canAuto ? "ok" : "warn"}">${canAuto ? "API" : txt("manualHint")}</span></p>
    `;
    grid.appendChild(card);

    const tr = document.createElement("tr");
    const [needCount, expl] = toTargetNeeded(currRating, currReviews, target);
    tr.innerHTML = `
      <td>${b.name}</td>
      <td>${fmt(currRating)}</td>
      <td>${fmt(currReviews)}</td>
      <td>${before ? `${fmt(before.rating)} / ${fmt(before.reviews)}` : txt("noData")}</td>
      <td>${after  ? `${fmt(after.rating)} / ${fmt(after.reviews)}`   : txt("noData")}</td>
      <td>${diffText(before, after)}</td>
      <td>${needCount !== null ? `${txt("need")} <b>${needCount}</b> ${txt("points")} ${txt("reach")} ${target}` : txt("noData")}<br><span class="muted">${expl || ""}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function diffText(before, after) {
  if (!before || !after) return txt("noData");
  const dr = (after.rating - before.rating).toFixed(2);
  const dv = (after.reviews - before.reviews);
  const sign = (x)=> (x>0?"+":x<0?"":"");
  return `${sign(dr)}${dr} / ${sign(dv)}${dv}`;
}

function renderBranchesList() {
  const host = $("branchesList");
  host.innerHTML = "";
  appState.branches.forEach((b) => {
    const el = document.createElement("div");
    el.className = "branch-item";
    el.innerHTML = `
      <div style="flex:1">
        <label>${txt("lblBranchName")}
          <input data-k="name" value="${b.name || ""}">
        </label>
        <label>${txt("lblMapsUrl")}
          <input data-k="url" value="${b.url || ""}">
        </label>
        <label>${txt("lblPlaceId")}
          <input data-k="placeId" value="${b.placeId || ""}">
        </label>
        <div class="muted">${txt("manualHint")}</div>
        <div class="row" style="margin-top:8px">
          <button class="secondary" data-act="update">${txt("update")}</button>
          <button class="danger" data-act="delete">${txt("delete")}</button>
        </div>
      </div>
    `;
    el.querySelector('[data-act="update"]').onclick = () => {
      b.name = el.querySelector('input[data-k="name"]').value.trim();
      b.url = el.querySelector('input[data-k="url"]').value.trim();
      b.placeId = el.querySelector('input[data-k="placeId"]').value.trim();
      persist(LS_KEYS.branches, appState.branches);
      alert(txt("save"));
      renderAll();
    };
    el.querySelector('[data-act="delete"]').onclick = () => {
      appState.branches = appState.branches.filter(x => x.id !== b.id);
      persist(LS_KEYS.branches, appState.branches);
      renderAll();
    };
    host.appendChild(el);
  });
}

function fillSettings() {
  $("apiKey").value = appState.settings.apiKey || "";
  $("refreshMinutes").value = appState.settings.refreshMinutes || 1;
}

// ======= DATE HELPERS =======
function presetRange(days) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - days);
  $("dateFrom").value = toISO(from);
  $("dateTo").value = toISO(to);
  renderAll();
}
function toISO(d) { return d.toISOString().slice(0,10); }

// ======= TARGET CALC =======
function toTargetNeeded(avg, reviews, t) {
  if (avg == null || reviews == null || isNaN(avg) || isNaN(reviews) || reviews < 0) return [null, ""];
  const S = avg * reviews;
  const denom = (5 - t);
  if (denom <= 0) return [0, ""];
  const need = Math.max(0, Math.ceil((t*reviews - S) / denom));
  const expl = `${txt("thReviews")}: ${reviews}, S=avg*reviews=${S.toFixed(1)}`;
  return [need, expl];
}
function fmt(v){ return (v===null||v===undefined) ? txt("noData") : v }

// ======= SNAPSHOTS =======
function ensureBranchHist(id) { if (!appState.snapshots[id]) appState.snapshots[id] = []; }
function addSnapshot(id, rating, reviews) {
  ensureBranchHist(id);
  appState.snapshots[id].push({ ts: Date.now(), rating, reviews });
  persist(LS_KEYS.snapshots, appState.snapshots);
}
function getLatestSnapshot(id) {
  const arr = appState.snapshots[id] || [];
  return arr[arr.length - 1] || null;
}
function getSnapshotAt(id, date, mode) {
  const arr = appState.snapshots[id] || [];
  if (!arr.length || !date) return null;
  const t = date.getTime();
  if (mode === "closestBefore") {
    const cand = [...arr].reverse().find(s => s.ts <= t);
    return cand || null;
  }
  if (mode === "closestAfter") {
    const cand = arr.find(s => s.ts >= t);
    return cand || null;
  }
  return null;
}

// ======= LIVE REFRESH =======
function setupLiveRefresh() {
  clearInterval(appState.liveTimer);
  if (!appState.settings.apiKey) { $("liveBadge").textContent = `• ${txt("liveOff")}`; return; }
  injectGoogleScript(appState.settings.apiKey, () => {
    const mapEl = $("mapHolder");
    const map = new google.maps.Map(mapEl);
    appState.placesService = new google.maps.places.PlacesService(map);
    $("liveBadge").textContent = `• ${txt("liveOn")}`;
    updateAllBranches(true);
    const ms = Math.max(1, appState.settings.refreshMinutes)*60*1000;
    appState.liveTimer = setInterval(updateAllBranches, ms);
  });
}
function injectGoogleScript(key, cb) {
  const exist = document.querySelector('script[data-v2-maps]');
  if (exist) { cb && cb(); return; }
  const s = document.createElement("script");
  s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&loading=async`;
  s.async = true; s.defer = true;
  s.dataset.v2Maps = "1";
  s.onload = () => cb && cb();
  s.onerror = () => alert("Google Maps script failed to load. Check API key / billing.");
  document.head.appendChild(s);
}
async function updateAllBranches(showAlerts=false) {
  if (!appState.placesService) { if(showAlerts) alert("Places service not ready"); return; }
  const promises = appState.branches.map(b => updateOneBranch(b));
  await Promise.all(promises);
  renderAll();
  if (showAlerts) alert("Updated.");
}
function updateOneBranch(b) {
  return new Promise((resolve) => {
    if (b.placeId) {
      appState.placesService.getDetails(
        { placeId: b.placeId, fields: ["name","rating","user_ratings_total","url","place_id"] },
        (res, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && res) {
            b.name = b.name || res.name;
            b.rating = res.rating ?? b.rating;
            b.reviews = res.user_ratings_total ?? b.reviews;
            b.placeId = res.place_id || b.placeId;
            if (!b.url && res.url) b.url = res.url;
            persist(LS_KEYS.branches, appState.branches);
            if (b.rating!=null && b.reviews!=null) addSnapshot(b.id, b.rating, b.reviews);
          }
          resolve();
        }
      );
    } else {
      const query = b.url || b.name || "";
      if (!query) return resolve();
      appState.placesService.findPlaceFromQuery(
        { query, fields:["place_id","name","formatted_address"] },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
            b.placeId = results[0].place_id;
            updateOneBranch(b).then(resolve);
          } else {
            resolve();
          }
        }
      );
    }
  });
}
function tryResolvePlaceIdFromUrl() {
  if (!appState.settings.apiKey) return alert("أضف مفتاح Google API أولاً في الإعدادات.");
  const url = $("mapsUrl").value.trim();
  const name = $("branchName").value.trim();
  if (!url && !name) return alert("أدخل رابط أو اسم الفرع.");
  injectGoogleScript(appState.settings.apiKey, () => {
    const map = new google.maps.Map($("mapHolder"));
    const svc = new google.maps.places.PlacesService(map);
    svc.findPlaceFromQuery({ query: url || name, fields: ["place_id","name"] }, (res, st) => {
      if (st === google.maps.places.PlacesServiceStatus.OK && res && res[0]) {
        $("placeId").value = res[0].place_id;
        alert(`تم إيجاد Place ID:\n${res[0].place_id}`);
      } else {
        alert("تعذر استخراج Place ID تلقائيًا. جرّب الاسم بالعربي/الإنجليزي أو أضفه يدويًا.");
      }
    });
  });
}

// ======= EXPORT CSV =======
function exportCsv() {
  const from = $("expFrom").value ? new Date($("expFrom").value).getTime() : 0;
  const to   = $("expTo").value   ? new Date($("expTo").value).getTime()   : Date.now();
  const rows = [["Branch","Place ID","Timestamp","Rating","Reviews"]];
  appState.branches.forEach(b => {
    const hist = appState.snapshots[b.id] || [];
    hist.forEach(s => { if (s.ts >= from && s.ts <= to) rows.push([b.name, b.placeId || "", new Date(s.ts).toISOString(), s.rating, s.reviews]); });
  });
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
  downloadBlob(csv, `v2_report_${Date.now()}.csv`, "text/csv;charset=utf-8");
}
function downloadBlob(content, filename, type) {
  const blob = new Blob([content], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(()=>URL.revokeObjectURL(url), 500);
}

// ======= UTILS =======
function fillDefaultsIfEmptySnapshots() {
  appState.branches.forEach(b=>{ if (b.rating!=null && b.reviews!=null) addSnapshot(b.id, b.rating, b.reviews); });
}
function fmt(v){ return (v===null||v===undefined) ? txt("noData") : v }
fillDefaultsIfEmptySnapshots();
