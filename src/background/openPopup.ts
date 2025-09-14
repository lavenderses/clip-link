import { openPopUpCommand } from "../const/const"

console.log("Hello world.")

chrome.commands.onCommand.addListener((command) => {
  console.log(`command called: ${command}`)
  if (command == openPopUpCommand) {
    chrome.action.openPopup()
  }
})