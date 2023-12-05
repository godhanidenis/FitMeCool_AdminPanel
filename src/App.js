import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import UserList from "./pages/UserList";
import { Box, CssBaseline } from "@mui/material";
import ShopList from "./pages/ShopList";

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <div className="p-4 ps-12 text-white font-semibold bg-[#151827] text-[22px] ">
          Admin Panel
        </div>
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
