import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import TablePagination from "@mui/material/TablePagination";

const ListTable = ({ details }) => {
  const accountFormContext = useContext(AccountFormContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = (detail) => {
    console.log(detail);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, details.length - page * rowsPerPage);
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
          {details
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((detail) => (
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
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 73 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={details.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ListTable;
