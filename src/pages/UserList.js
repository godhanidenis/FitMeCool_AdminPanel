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
import { deleteObjectsInFolder } from "../services/wasabi";
import { useNavigate } from "react-router-dom";

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

const UserList = ({ setSelectedVender }) => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDeleteModalOpen, setUserDeleteModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(false);

  const navigate = useNavigate();

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
              {!loading ? (
                customerData.length !== 0 ? (
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
                                ? "text-[#29977E]  bg-[#29977d21] cursor-pointer"
                                : "text-[#000] bg-[#00000011]"
                            }`}
                            onClick={() => {
                              if (item?.user_type === "vendor") {
                                setSelectedVender(item?.id);
                                navigate("/shopList");
                              }
                            }}
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <div className="text-[20px] font-semibold">
                        No User Found
                      </div>
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
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
      <DeleteAccountConfirmationModal
        deleteLoader={deleteLoader}
        deleteModalOpen={userDeleteModalOpen}
        setDeleteModalOpen={setUserDeleteModalOpen}
        onClickItemDelete={async () => {
          setDeleteLoader(true);
          await deleteAccount({ id: userId, forAdmin: true }).then(
            async (res) => {
              console.log("User deleted");
              const folderStructure = `user_${userId}`;
              await deleteObjectsInFolder(folderStructure);

              toast.success(res?.data?.deleteAccount, {
                theme: "colored",
              });
              setDeleteLoader(false);
            },
            (error) => {
              toast.error(error.message, { theme: "colored" });
              setDeleteLoader(false);
            }
          );
          setUserDeleteModalOpen(false);
          getCustomer();
        }}
      />
    </div>
  );
};

export default UserList;
