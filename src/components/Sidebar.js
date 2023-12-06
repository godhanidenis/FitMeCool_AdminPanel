import React, { useEffect, useState } from "react";
import StoreIcon from "@mui/icons-material/Store";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Assets/Logo.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    // Close the drawer if needed
  };

  const sidebarTabs = [
    {
      label: "Dashboard",
      icon: <DashboardIcon />,
      path: "/",
    },
    {
      label: "Users",
      icon: <PeopleAltIcon />,
      path: "/userList",
    },
    {
      label: "Shops",
      icon: <StoreIcon />,
      path: "/shopList",
    },
  ];

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedValue("Dashboard");
    } else if (location.pathname === "/userList") {
      setSelectedValue("Users");
    } else if (location.pathname === "/shopList") {
      setSelectedValue("Shops");
    }
  }, [location.pathname]);

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="!flex !justify-between">
          {open && (
            <img
              src={Logo}
              alt="Logo"
              className="w-40 h-8 ms-2 cursor-pointer"
              onClick={() => navigate("/")}
            />
          )}
          <IconButton onClick={handleDrawerClose}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarTabs.map((tab, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleNavigation(tab.path)}
              className={`${selectedValue === tab.label && "bg-[#29977d1e]"}`}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                  className={`${
                    selectedValue === tab.label && "!text-[#29977E]"
                  }`}
                >
                  {tab.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                >
                  <span
                    className={`${
                      selectedValue === tab.label && "!text-[#29977E]"
                    } font-semibold text-[#00000079]`}
                  >
                    {tab.label}
                  </span>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
