self.addEventListener('install', async function(event) {
  const tabs = await chrome.tabs.query({url: 'https://chat.openai.com/*'});
  
  if(tabs.length > 0) {
    await chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Reload OpenAI Tabs?',
      message: 'Would you like to reload your OpenAI tabs to activate the extension?',
      buttons: [{ title: 'Reload' }],
      priority: 2
    });
  }
});

chrome.notifications.onButtonClicked.addListener(async function() {
  const tabs = await chrome.tabs.query({url: 'https://chat.openai.com/*'});
  
  tabs.forEach(tab => {
    chrome.tabs.reload(tab.id);
  });
});
