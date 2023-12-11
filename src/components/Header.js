import React, { useEffect, useRef, useState } from "react";
import WLogo from "../Assets/whiteLogo.png";
import {
  Avatar,
  ClickAwayListener,
  Divider,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllCustomers } from "../graphql/query/GetAllCustomers";
import { toast } from "react-toastify";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Header = ({ open }) => {
  const [accessToken, setAccessToken] = useState();
  const [customerData, setCustomerData] = useState([]);
  const [loginUserData, setLoginUserData] = useState([]);

  const navigate = useNavigate();

  const getCustomer = () => {
    getAllCustomers().then(
      (res) => {
        setCustomerData(res?.adminUserLists);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    const getAccessToken = localStorage.getItem("token");
    setAccessToken(getAccessToken);
    const userId = localStorage.getItem("userId");
    console.log("userData 12453 :>> ", userId);
    console.log("userData data :>> ", customerData);
    const userData = customerData?.filter((item) => item?.id?.includes(userId));
    console.log("userData  :>> ", userData);
    setLoginUserData(userData);
  }, [customerData]);

  return (
    <div className="flex justify-between items-center bg-[#151827] p-[13px] px-20">
      <div className={"text-white font-semibold text-[22px]"}>
        {!open && (
          <img
            src={WLogo}
            alt="Logo"
            className="w-40 h-8 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          />
        )}
      </div>
      <div className="flex justify-center items-center">
        {accessToken && (
          <>
            <UserProfile
              setAccessToken={setAccessToken}
              loginUserData={loginUserData[0]}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

export const UserProfile = ({ setAccessToken, loginUserData }) => {
  const [anchorElUser, setAnchorElUser] = useState(false);
  const anchorRef = useRef(null);
  const navigate = useNavigate();

  const handleProfileToggle = () => {
    setAnchorElUser((prevOpen) => !prevOpen);
  };

  const handleProfileClose = () => {
    setAnchorElUser(false);
  };

  const options = [
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  function logoutUser() {
    setAccessToken("");
    handleProfileClose();
    localStorage.clear();
    navigate("/");

    toast.success("Logout Successfully", {
      theme: "colored",
    });
  }

  return (
    <div className="flex items-center gap-5">
      <div
        ref={anchorRef}
        onClick={handleProfileToggle}
        className="flex items-center justify-between gap-4 cursor-pointer"
      >
        <Avatar
          className="!bg-[#29977E]"
          sx={{
            fontSize: "14px",
          }}
        >
          {String(loginUserData?.first_name)?.charAt(0).toUpperCase() +
            String(loginUserData?.last_name?.charAt(0).toUpperCase())}
        </Avatar>
        <span className="font-semibold hidden text-white sm:flex">
          {loginUserData?.first_name + " " + loginUserData?.last_name}
        </span>

        <KeyboardArrowDownIcon className="!hidden !text-white sm:!flex" />
      </div>
      <Popper
        open={anchorElUser}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        className="z-40"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "left top" : "left bottom",
            }}
          >
            <Paper
              sx={{
                boxShadow: "none",
                overflow: "visible",
                mt: "5px !important",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              }}
            >
              <ClickAwayListener onClickAway={handleProfileClose}>
                <MenuList autoFocusItem={anchorElUser}>
                  <div className="flex flex-col mx-4 my-2 items-center">
                    <Avatar className="!mb-2 !w-14 !h-14 !bg-[#29977E]">
                      {String(loginUserData?.first_name)
                        ?.charAt(0)
                        .toUpperCase() +
                        String(
                          loginUserData?.last_name?.charAt(0).toUpperCase()
                        )}
                    </Avatar>
                    <b>
                      {loginUserData?.first_name +
                        " " +
                        loginUserData?.last_name}
                    </b>
                    <span className="font-medium text-base">
                      {/* {userProfile?.user_email} */}
                    </span>
                  </div>

                  <Divider />

                  {options.map((itm) => (
                    <MenuItem
                      key={itm.name}
                      onClick={() => {
                        handleProfileClose();
                        itm.func();
                      }}
                    >
                      <p className="flex items-center w-full text-center">
                        {itm.icon} <span className="ml-4"> {itm.name}</span>
                      </p>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
