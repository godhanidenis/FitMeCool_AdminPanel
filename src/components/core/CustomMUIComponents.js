import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";

export const CustomAuthModal = styled(Modal)(({ theme }) => ({
  [`& .MuiBackdrop-root`]: {
    backgroundColor: "transparent !important",
  },
}));
