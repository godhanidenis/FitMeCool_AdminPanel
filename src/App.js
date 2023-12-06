import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UserList from "./pages/UserList";
import { Box, CssBaseline } from "@mui/material";
import ShopList from "./pages/ShopList";
import Header from "./components/Header";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Header open={open} />
        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/userList" exact element={<UserList />} />
            <Route path="/shopList" exact element={<ShopList />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
