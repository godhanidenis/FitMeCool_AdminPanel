import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UserList from "./pages/UserList";
import { Box, CssBaseline } from "@mui/material";
import ShopList from "./pages/ShopList";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
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
      <ToastContainer />
      <CssBaseline />
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header open={open} />
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/userList" exact element={<UserList />} />
            <Route path="/shopList" exact element={<ShopList />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
