// Save settings
document.getElementById("save-btn").addEventListener("click", function () {
  const interval = document.getElementById("interval-input").value;
  const showSaveButton = document.getElementById("show-save-button").checked;
  const showTokens = document.getElementById("show-tokens").checked;

  // Save all settings, including the progress bar size value
  chrome.storage.sync.set(
    {
      interval,
      showSaveButton,
      showTokens,
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
  ["interval", "showSaveButton", "showTokens"],
  function (result) {
    document.getElementById("interval-input").value = result.interval || 1000;
    document.getElementById("show-save-button").checked =
      result.showSaveButton === true; // Defaults to true if not yet set
    document.getElementById("show-tokens").checked = result.showTokens === true; // Defaults to true if not yet set
    
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
