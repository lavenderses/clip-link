import styled from "@emotion/styled";
import { ListItemButton } from "@mui/material";

const ClipLinkListItemButton = styled(ListItemButton)(({}) => ({
  backgroundColor: "lightgreen",
  color: "darkgreen",
  "&:hover": {
    backgroundColor: "green",
    color: "black",
  },
  "&.Mui-selected": {
    backgroundColor: "darkgreen",
    color: "black",
  },
}));

export default ClipLinkListItemButton