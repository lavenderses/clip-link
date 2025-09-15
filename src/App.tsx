import { useEffect, useRef } from 'react'
import { Box, List, ListItemText } from '@mui/material';
import ClipLinkListItemButton from './component/ClipLinkListItemButton';
import { ClipOption, options } from './const/options';

function App() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const currentIndex = itemRefs.current.findIndex(
      (item) => item === document.activeElement
    );
    if (currentIndex === -1) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % options.length;
      itemRefs.current[nextIndex]?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      itemRefs.current[prevIndex]?.focus();
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied:", text);
    } catch (err) {
      console.error("コピーに失敗しました:", err);
    }
  };

  const copyTitleAndLink = async (clipOption: ClipOption) => {
    try {
      const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) =>
        chrome.tabs.query({ active: true, currentWindow: true }, resolve)
      );
  
      const tab = tabs[0];
      if (!tab) return;
      let linktext;
      switch (clipOption) {
        case ClipOption.PLAIN_TEXT:
          linktext = `${tab.title} ${tab.url}`;
          break
        case ClipOption.MARKDOWN:
          linktext = `[${tab.title}](${tab.url})`;
          break
        case ClipOption.TEXT_ONLY:
          linktext = `${tab.title}`;
          break
      }
      console.log(linktext);
  
      await copyToClipboard(linktext);
    } catch (err) {
      console.error(err);
    }
  };

  // 初期フォーカス
  useEffect(() => {
    itemRefs.current[0]?.focus();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          onKeyDown={handleKeyDown}
          sx={{ bgcolor: "background.paper" }}
          tabIndex={0}
        >
          {options.map((option, i) => (
            <ClipLinkListItemButton
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onClick={() => copyTitleAndLink(option.type)}
              sx={{
                mt: 1,
                borderRadius: 2,
              }}
            >
              <ListItemText primary={option.displayText} />
            </ClipLinkListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default App
