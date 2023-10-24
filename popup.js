// Save settings
document.getElementById("save-btn").addEventListener("click", function () {
  const interval = document.getElementById("interval-input").value;
  const showSaveButton = document.getElementById("show-save-button").checked;
  const showTokens = document.getElementById("show-tokens").checked;
  const autoFullMode = document.getElementById("auto-full-mode").checked; // Add this line to get the checkbox value

  // Save all settings, including the progress bar size value
  chrome.storage.sync.set(
    {
      interval,
      showSaveButton,
      showTokens,
      autoFullMode, // Add the new setting
    },
    function () {
      console.log("Settings saved");

      // Change the text of the reload button
      document.getElementById("reload-btn").textContent =
        "Pending saving. Reload OpenAI tabs now?";
    }
  );
});

// Load current settings when popup opens
chrome.storage.sync.get(
  ["interval", "showSaveButton", "showTokens", "autoFullMode"], // Add "autoFullMode" to the list of settings
  function (result) {
    document.getElementById("interval-input").value = result.interval || 1000;
    document.getElementById("show-save-button").checked =
      result.showSaveButton === true;
    document.getElementById("show-tokens").checked =
      result.showTokens !== false;
    document.getElementById("auto-full-mode").checked =
      result.autoFullMode !== false; // Enforce to on as default
  }
);

// Reload tabs
document
  .getElementById("reload-btn")
  .addEventListener("click", async function () {
    // Change the text of the reload button
    document.getElementById("reload-btn").textContent = "Reload OpenAI Tabs";

    const tabs = await chrome.tabs.query({ url: "https://chat.openai.com/*" });

    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });
  });
