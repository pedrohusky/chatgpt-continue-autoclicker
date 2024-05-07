function handleInstalled(details) {
  browser.notifications
    .create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Reload OpenAI Tabs?",
      message:
        "Would you like to reload your OpenAI tabs to activate the extension?",
      priority: 2,
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}

browser.runtime.onInstalled.addListener(handleInstalled);

browser.notifications.onClicked.addListener(function (notificationId) {
  browser.tabs
    .query({ url: "https://chatgpt.com/*" })
    .then((tabs) => {
      tabs.forEach((tab) => {
        browser.tabs.reload(tab.id);
      });
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
});
