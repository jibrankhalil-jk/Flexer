async function DarkModeMainFunction(enable) {
  const topLeftDivId = "flexer-top-left-overlay";

  if (!document.getElementById("flexer-dark-style")) {
    const style = document.createElement("style");
    style.id = "flexer-dark-style";
    style.textContent = `
      body.flexer-dark-mode,
      body.flexer-dark-mode div,
      body.flexer-dark-mode section,
      body.flexer-dark-mode header,
      body.flexer-dark-mode main,
      body.flexer-dark-mode footer,
      body.flexer-dark-mode table,
      body.flexer-dark-mode tbody,
      body.flexer-dark-mode tr,
      body.flexer-dark-mode td,
      body.flexer-dark-mode th,
      body.flexer-dark-mode input,
      body.flexer-dark-mode select,
      body.flexer-dark-mode textarea,
      body.flexer-dark-mode .card,
      body.flexer-dark-mode .panel,
      body.flexer-dark-mode .panel-body {
        background-color: #121212 !important;
        color: #e0e0e0 !important;
        border-color: #333 !important;
      }

      body.flexer-dark-mode a { color: #bb86fc !important; }
      body.flexer-dark-mode .btn { background-color: #333 !important; color: #fff !important; }
    `;
    document.head.appendChild(style);
  }

  if (enable === true) {
    document.body.classList.add("flexer-dark-mode");

    if (!document.getElementById(topLeftDivId)) {
      const topLeftDiv = document.createElement("div");
      topLeftDiv.id = topLeftDivId;
      topLeftDiv.style.position = "fixed";
      topLeftDiv.style.top = "0";
      topLeftDiv.style.left = "0";
      topLeftDiv.style.width = "300px";
      topLeftDiv.style.height = "80px";
      topLeftDiv.style.backgroundColor = "#000";
      topLeftDiv.style.zIndex = "9999";
      topLeftDiv.style.pointerEvents = "none";
      document.body.appendChild(topLeftDiv);
    }
  } else if (enable === false) {
    document.body.classList.remove("flexer-dark-mode");

    const overlay = document.getElementById(topLeftDivId);
    if (overlay) overlay.remove();
  } else {
    const isDark = document.body.classList.toggle("flexer-dark-mode");

    if (isDark) {
      if (!document.getElementById(topLeftDivId)) {
        const topLeftDiv = document.createElement("div");
        topLeftDiv.id = topLeftDivId;
        topLeftDiv.style.position = "fixed";
        topLeftDiv.style.top = "0";
        topLeftDiv.style.left = "0";
        topLeftDiv.style.width = "300px";
        topLeftDiv.style.height = "80px";
        topLeftDiv.style.backgroundColor = "#000";
        topLeftDiv.style.zIndex = "9999";
        topLeftDiv.style.pointerEvents = "none";
        document.body.appendChild(topLeftDiv);
      }
    } else {
      const overlay = document.getElementById(topLeftDivId);
      if (overlay) overlay.remove();
    }
  }
}

(async () => {
  const result = await chrome.storage.local.get("darkMode");
  if (result.darkMode) DarkModeMainFunction(true);
})();
