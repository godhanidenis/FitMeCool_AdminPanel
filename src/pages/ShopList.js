import React, { useEffect, useState } from "react";
import {
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

const ShopList = () => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCustomer = () => {
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

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <div>
      <div className="p-2 bg-[#0000001a] flex justify-center rounded-xl my-2 text-3xl font-semibold">
        Shop List
      </div>
      <div className="relative">
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
                ].map((itm, index) => (
                  <StyledTableCell align="center" key={index} index={index}>
                    <b>{itm}</b>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                shopData?.map((item, index) => (
                  <StyledTableRow key={index}>
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
                          className={`line-clamp-1 w-32 text-white py-2 rounded-xl ${
                            item?.shop_type !== "shop"
                              ? "bg-[#31acb4]"
                              : "bg-[#259246]"
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
                        {item?.shopFollowerCount ? item?.shopFollowerCount : 0}
                      </div>
                    </TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {loading && (
          <div className="flex p-10 justify-center items-center h-full w-full">
            <CircularProgress className="!text-[#29977E]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopList;
