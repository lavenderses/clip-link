import { ClipOption } from "../const/options";
import type ContextSupplier from "./ContextSupplier";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied:", text);
  } catch (err) {
    console.error("Failed to copy", err);
  }
};

const getTab: () => Promise<chrome.tabs.Tab> = async () => {
  const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) =>
    chrome.tabs.query({ active: true, currentWindow: true }, resolve)
  )
  return tabs[0]
}

export const copyTitleAndLink = async (contextSupplier: ContextSupplier, clipOption: ClipOption) => {
  try {
    const title = await contextSupplier.byContext(
      async () => {
        const tab = await getTab()
        return tab.title ?? ""
      },
      async () => document.title,
    )
    const url = await contextSupplier.byContext(
      async () => {
        const tab = await getTab()
        return tab.url ?? ""
      },
      async () => window.location.href,
    )

    let linktext;
    switch (clipOption) {
      case ClipOption.PLAIN_TEXT:
        linktext = `${title} ${url}`;
        break
      case ClipOption.MARKDOWN:
        linktext = `[${title}](${url})`;
        break
      case ClipOption.TEXT_ONLY:
        linktext = `${title}`;
        break
    }
    console.log(linktext);

    await copyToClipboard(linktext);
  } catch (err) {
    console.error(err);
  }
};
