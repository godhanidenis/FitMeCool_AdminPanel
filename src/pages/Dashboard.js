import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StoreIcon from "@mui/icons-material/Store";
import { getAllCustomers } from "../graphql/query/GetAllCustomers";
import { getAllShops } from "../graphql/query/GetAllShops";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Dashboard = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [shopData, setShopData] = useState([]);

  const iconStyles = {
    fontSize: 24,
    "@media (max-width: 1024px)": {
      fontSize: 24,
    },
    "@media (max-width: 768px)": {
      fontSize: 20,
    },
    "@media (max-width: 648px)": {
      fontSize: 24,
    },
  };

  const dashboardCards = [
    {
      label: "Total Users",
      totalNumber: customerData?.length,
      icon: <PeopleAltIcon sx={iconStyles} />,
      path: "/userList",
    },
    {
      label: "Total Shops",
      totalNumber: shopData?.length,
      icon: <StoreIcon sx={iconStyles} />,
      path: "/shopList",
    },
  ];

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

  const getShop = () => {
    getAllShops().then(
      (res) => {
        setShopData(res?.adminShopLists);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getShop();
    getCustomer();
  }, []);

  return (
    <div>
      <div className="p-2 my-3 flex items-center gap-2">
        <span className="font-semibold text-lg">Dashboard</span>
        <ChevronRightIcon />
      </div>
      <div className="flex sm:flex-row flex-col flex-wrap items-center lg:gap-8 gap-4">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="cursor-pointer h-max w-[300px] flex items-center justify-between px-6 font-semibold text-black rounded-3xl bg-white"
            onClick={() => card?.path && navigate(card?.path)}
          >
            <div className="py-7">
              <p className="text-base text-[#31333e8f] font-semibold pb-2">
                {card.label}
              </p>
              <p className="text-2xl text-[#151827] font-semibold">
                {card.totalNumber ?? 0}
              </p>
            </div>
            <span className="bg-[#F3F6F6]  rounded-full p-3">{card.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
