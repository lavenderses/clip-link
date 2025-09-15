import { useEffect, useRef, useState } from 'react'
import { Alert, Box, List, ListItemText, Snackbar } from '@mui/material';
import ClipLinkListItemButton from './component/ClipLinkListItemButton';
import { options } from './const/options';
import { copyTitleAndLink } from './utils/link';
import ContextSupplier from './utils/ContextSupplier';
import { getCopiedMessage } from './utils/message';

const closeMilliSec = 2_000

function App() {
  const contextSupplier = new ContextSupplier()
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleClose: () => void = () => {
    setOpen(false);
  }

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
              onClick={async () => {
                await copyTitleAndLink(contextSupplier, option.type)
                setOpen(true)
                setMessage(getCopiedMessage(option.type))

                // close window if chrome extension,
                setTimeout(async () => {
                  await contextSupplier.byContext(
                      async () => window.close(),
                      async () => {},
                  )
                }, closeMilliSec);
              }}
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={closeMilliSec}
        onClose={handleClose}
        message={message}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >{message}</Alert>
      </Snackbar>
    </Box>
  );
}

export default App
