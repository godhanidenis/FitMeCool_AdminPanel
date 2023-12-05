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
import { getAllCustomers } from "../graphql/query/GetAllCustomers";
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

const UserList = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCustomer = () => {
    setLoading(true);
    getAllCustomers().then(
      (res) => {
        setCustomerData(res?.adminUserLists);
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
        User List
      </div>
      <div className="relative">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {[
                  "No",
                  "User Name",
                  "contact Number",
                  "Email",
                  "User Type",
                ].map((itm, index) => (
                  <StyledTableCell align="center" key={index} index={index}>
                    <b>{itm}</b>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                customerData?.map((item, index) => (
                  <StyledTableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>

                    <TableCell align="center">
                      <div className="line-clamp-1">
                        {item?.first_name} {item?.last_name}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="line-clamp-1">
                        {item?.user_contact ? item?.user_contact : "-"}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="line-clamp-1">
                        {item?.user_email ? item?.user_email : "-"}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <div
                          className={`line-clamp-1 w-32 text-white py-2 rounded-xl ${
                            item?.user_type === "vendor"
                              ? "bg-[#31acb4]"
                              : "bg-[#259246]"
                          }`}
                        >
                          {item?.user_type}
                        </div>
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

export default UserList;
