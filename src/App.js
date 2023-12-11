import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";
import ShopList from "./pages/ShopList";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import AuthCommonLayout from "./components/AuthCommonLayout";
import Signup from "./pages/Signup";
import { PrivateRoutes, PublicRoutes } from "./components/PrivateRoutes";

const App = () => {
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    const getAccessToken = localStorage.getItem("token");
    setAccessToken(getAccessToken);
  }, [accessToken]);
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route
          path="/"
          exact
          element={
            <AuthCommonLayout>
              <Login />
            </AuthCommonLayout>
          }
        />

        <Route
          path="/signup"
          exact
          element={
            <AuthCommonLayout>
              <Signup />
            </AuthCommonLayout>
          }
        />
        <Route
          path="*"
          exact
          element={
            <AuthCommonLayout>
              <Login />
            </AuthCommonLayout>
          }
        />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/dashboard"
          exact
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/userList"
          exact
          element={
            <DashboardLayout>
              <UserList />
            </DashboardLayout>
          }
        />
        <Route
          path="/shopList"
          exact
          element={
            <DashboardLayout>
              <ShopList />
            </DashboardLayout>
          }
        />
        <Route
          path="*"
          exact
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
