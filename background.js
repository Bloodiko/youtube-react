chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

const youtubeVideoPattern = /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+(&.*)?$/;

