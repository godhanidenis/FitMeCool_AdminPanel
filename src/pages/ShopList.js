import React, { useEffect, useRef, useState } from "react";
import {
  // Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAllShops } from "../graphql/query/GetAllShops";
import moment from "moment";
import { CircularProgress } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import CustomSwitchComponent from "../components/core/CustomSwitchComponent";

const StyledTableCell = styled(TableCell)(({ theme, index }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#151827",
    color: "white",
    width: index === 0 ? "20px" : "100px",
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ShopList = ({ selectedVender, setSelectedVender }) => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(true);

  const resultRef = useRef(null);

  const getShop = () => {
    setLoading(true);
    getAllShops().then(
      (res) => {
        setShopData(res?.adminShopLists);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  const handleButtonClick = (item) => {
    const shopName = item?.shop_name.replaceAll(" ", "-");
    const Link = process.env.REACT_APP_BASE_URL.split("/")[2];
    if (Link === "dev-api.fitmecool.com") {
      const url = `https://www.dev.fitmecool.com/shop/${shopName}/${item?.id}`;
      window.open(url, "_blank");
    } else {
      const url = `https://www.fitmecool.com/shop/${shopName}/${item?.id}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    selectedVender &&
      resultRef.current &&
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    selectedVender &&
      setTimeout(() => {
        setSelectedRow(false);
      }, 3000);
    !selectedRow && setSelectedVender("");
  }, [selectedVender, setSelectedVender, selectedRow]);

  useEffect(() => {
    getShop();
  }, []);

  return (
    <div>
      <div className="p-2 my-3 flex items-center gap-2">
        <span className="font-semibold text-lg">Shop List</span>
        <ChevronRightIcon />
      </div>
      <div className="relative">
        {/* {tableShopId && (
          <Alert severity={"error"} className="my-5">
            <span className="cursor-pointer font-semibold ml-2">
              Shop Not Created
            </span>
          </Alert>
        )} */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {[
                  "No",
                  "Shop Name",
                  "Email",
                  "Shop Type",
                  "Create Date",
                  "Subscription Date",
                  "Reviews",
                  "Followers",
                  "Status",
                  "Action",
                ].map((itm, index) => (
                  <StyledTableCell align="center" key={index} index={index}>
                    <b>{itm}</b>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading ? (
                shopData.length !== 0 ? (
                  shopData?.map((item, index) => (
                    <StyledTableRow
                      key={index}
                      ref={selectedVender === item?.user_id ? resultRef : null}
                      className={`${
                        selectedVender === item?.user_id &&
                        selectedRow &&
                        "!bg-[#3485ff25]"
                      }`}
                    >
                      <TableCell align="center">{index + 1}</TableCell>

                      <TableCell align="center">
                        <div className="line-clamp-1">{item?.shop_name}</div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="line-clamp-1">
                          {item?.shop_email ? item?.shop_email : "-"}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          <div
                            className={`line-clamp-1 w-32 font-semibold py-2 rounded-xl ${
                              item?.shop_type === "shop"
                                ? "text-[#29977E]  bg-[#29977d21]"
                                : "text-[#000] bg-[#00000011]"
                            }`}
                          >
                            {item?.shop_type}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="line-clamp-1">
                          {moment(Number(item?.createdAt)).format("DD-MM-YYYY")}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="line-clamp-1">
                          {item?.subscriptionDate
                            ? moment(Number(item?.subscriptionDate)).format(
                                "DD-MM-YYYY"
                              )
                            : "-"}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="line-clamp-1">
                          {item?.shopReviewCount ? item?.shopReviewCount : 0}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="line-clamp-1">
                          {item?.shopFollowerCount
                            ? item?.shopFollowerCount
                            : 0}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="line-clamp-1">
                          <CustomSwitchComponent
                            shopStatus={item?.shop_status}
                            shopId={item?.id}
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex gap-2 justify-center">
                          <button
                            className={`flex justify-center items-center p-2 gap-1 rounded-lg transition-colors bg-[#29977E] text-white font-semibold duration-300 hover:opacity-80`}
                            onClick={() => handleButtonClick(item)}
                          >
                            <NorthEastIcon className="!text-white !text-[20px]" />
                          </button>
                        </div>
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <div className="text-[20px] font-semibold">
                        No Shop Found
                      </div>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <div className="flex p-10 justify-center items-center h-full w-full">
                      <CircularProgress className="!text-[#29977E]" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ShopList;
