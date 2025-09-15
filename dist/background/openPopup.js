const n="openPopup";console.log("Hello world.");chrome.commands.onCommand.addListener(o=>{console.log(`command called: ${o}`),o==n&&chrome.action.openPopup()});
