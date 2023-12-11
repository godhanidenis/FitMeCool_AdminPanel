import { Box, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#F3F6F6",
        height: "100vh",
        overflow: "scroll",
      }}
    >
      <CssBaseline />
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header open={open} />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
