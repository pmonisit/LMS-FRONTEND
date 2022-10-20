import React, { useContext, useState } from "react";
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
import { AdminContext } from "../../../context/admin/account/adminContext";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import * as semesterService from "../../../services/admin/Semester";
import { WindowScrollController } from "@fullcalendar/react";

const SemesterListTable = ({ details }) => {
  const adminContext = useContext(AdminContext);
  const handleEdit = (detail) => {
    console.log(detail);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isCurrent, setIsCurrent] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, details.length - page * rowsPerPage);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>

            <TableCell align="center">Start Year</TableCell>
            <TableCell align="center">End Year</TableCell>
            <TableCell align="center">Semester Order</TableCell>
            <TableCell align="center">Current Semester</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((detail) => (
              <TableRow
                key={detail.semesterId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {detail.startDate}
                </TableCell>

                <TableCell align="center">{detail.startingYear}</TableCell>
                <TableCell align="center">{detail.endingYear}</TableCell>
                <TableCell align="center">{detail.semOrder}</TableCell>
                <TableCell align="center">
                  {/* {detail.isCurrent ? "True" : "False"} */}
                  {detail.isCurrent ? (
                    "Current Semester"
                  ) : (
                    <Button
                      onClick={() => {
                        semesterService
                          .changeIsCurrent(detail.semesterId)
                          .then((res) => {
                            window.location.reload();
                          });
                      }}
                    >
                      Activate
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      adminContext.onSetIsEditSemester(true);
                    }}
                    LinkComponent={Link}
                    to={`/admin/semester/${detail.semesterId}/edit`}
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

export default SemesterListTable;
