import React from "react";
import WLogo from "../Assets/whiteLogo.png";
import { Avatar } from "@mui/material";

const Header = ({ open }) => {
  return (
    <div className="flex justify-between items-center bg-[#151827] p-[13px] px-20">
      <div className={"text-white font-semibold text-[22px]"}>
        {!open && <img src={WLogo} alt="Logo" className="w-40 h-8" />}
      </div>
      <div className="flex gap-3 justify-center items-center">
        <Avatar className="!bg-[#29977E] !text-lg">DG</Avatar>
        <span className="text-white">Admin</span>
      </div>
    </div>
  );
};

export default Header;
