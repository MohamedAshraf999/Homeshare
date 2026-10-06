const PWA_URL = "https://YOUR-DOMAIN.example/homeshare/";
document.getElementById("open").addEventListener("click", () => {
  chrome.tabs.create({ url: PWA_URL });
});