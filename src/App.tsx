import { useEffect, useRef } from 'react'
import './App.css'
import { List, ListItemButton, ListItemText } from '@mui/material';

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

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

  const copyTitleAndLink = async () => {
    try {
      const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) =>
        chrome.tabs.query({ active: true, currentWindow: true }, resolve)
      );
  
      const tab = tabs[0];
      if (!tab) return;
  
      const linktext = `${tab.title} - ${tab.url}`;
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
    <List
      onKeyDown={handleKeyDown}
      sx={{ width: "200px", bgcolor: "background.paper" }}
      tabIndex={0}
    >
      {options.map((text, i) => (
        <ListItemButton
          component="div"
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          onClick={() => copyTitleAndLink()}
        >
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default App
