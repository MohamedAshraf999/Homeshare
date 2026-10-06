chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("homes-share-check", {periodInMinutes: 30});
});
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== "homes-share-check") return;
  // Reserved for the existing HomeShare automatic-settlement logic.
});