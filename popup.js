// Save settings
document.getElementById("save-btn").addEventListener("click", function () {
    const interval = document.getElementById("interval-input").value;
    const showSaveButton = document.getElementById("show-save-button").checked;
    chrome.storage.sync.set({ interval, showSaveButton }, function () {
        console.log('Settings saved');

        // Change the text of the reload button
        document.getElementById("reload-btn").textContent = "Pending saving. Reload OpenAI tabs now?";
    });
});


// Reload tabs
document.getElementById("reload-btn").addEventListener('click', async function () {

    // Change the text of the reload button
    document.getElementById("reload-btn").textContent = "Reload OpenAI Tabs";

    const tabs = await chrome.tabs.query({ url: 'https://chat.openai.com/*' });

    tabs.forEach(tab => {
        chrome.tabs.reload(tab.id);
    });
});

// Load current settings when popup opens
chrome.storage.sync.get(['interval', 'showSaveButton'], function (result) {
    document.getElementById("interval-input").value = result.interval || 1000;
    document.getElementById("show-save-button").checked = result.showSaveButton !== false; // Defaults to true if not yet set
});
