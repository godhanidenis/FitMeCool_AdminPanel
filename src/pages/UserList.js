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
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteAccountConfirmationModal from "../components/Modal/DeleteAccountConfirmationModal";
import { deleteAccount } from "../graphql/mutations/authMutations";
import { toast } from "react-toastify";

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
  const [userDeleteModalOpen, setUserDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState("");

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
      <div className="p-2 my-3 flex items-center gap-2">
        <span className="font-semibold text-lg">User List</span>
        <ChevronRightIcon />
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
                  "Action",
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
                          className={`line-clamp-1 w-32 py-2 rounded-xl font-semibold ${
                            item?.user_type === "vendor"
                              ? "text-[#29977E]  bg-[#29977d21]"
                              : "text-[#000] bg-[#00000011]"
                          }`}
                        >
                          {item?.user_type}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex gap-2 justify-center">
                        <button
                          className={`flex justify-center items-center w-8 h-8 rounded-full transition-colors bg-red-600 duration-300 hover:opacity-80`}
                          onClick={() => {
                            setUserDeleteModalOpen(true);
                            setUserId(item?.id);
                          }}
                        >
                          <DeleteIcon
                            className="!text-white"
                            sx={{
                              fontSize: 18,
                              "@media (max-width: 648px)": {
                                fontSize: 16,
                              },
                            }}
                          />
                        </button>
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
      <DeleteAccountConfirmationModal
        deleteModalOpen={userDeleteModalOpen}
        setDeleteModalOpen={setUserDeleteModalOpen}
        onClickItemDelete={async () => {
          await deleteAccount({ id: userId, forAdmin: true }).then(
            (res) => {
              console.log("User deleted");

              toast.success(res?.data?.deleteAccount, {
                theme: "colored",
              });
            },
            (error) => {
              toast.error(error.message, { theme: "colored" });
            }
          );
          setUserDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserList;
