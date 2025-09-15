import { useEffect, useRef } from 'react'
import { Box, List, ListItemText } from '@mui/material';
import ClipLinkListItemButton from './component/ClipLinkListItemButton';
import { options } from './const/options';
import { copyTitleAndLink } from './utils/link';
import ContextSupplier from './utils/ContextSupplier';

function App() {
  const contextSupplier = new ContextSupplier()
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
              onClick={() => copyTitleAndLink(contextSupplier, option.type)}
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
