import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const ListTable = ({ details }) => {
  const accountFormContext = useContext(AccountFormContext);
  const handleEdit = (detail) => {
    console.log(detail);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Surname</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Middle Name</TableCell>
            <TableCell align="center">Account Id</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <TableRow
              key={detail.accountId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {detail.lastName}
              </TableCell>
              <TableCell align="center">{detail.firstName}</TableCell>
              <TableCell align="center">{detail.middleName}</TableCell>
              <TableCell align="center">{detail.accountId}</TableCell>
              <TableCell align="center">
                <IconButton
                  LinkComponent={Link}
                  to={`/admin/user-details/${detail.accountId}`}
                >
                  <ArrowForwardIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    accountFormContext.onSetIsEdit(true);
                  }}
                  LinkComponent={Link}
                  to={`/admin/user/${detail.accountId}/edit`}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
