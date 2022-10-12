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
import { AdminContext } from "../../../context/admin/account/adminContext";

const SemesterListTable = ({ details }) => {
  const adminContext = useContext(AdminContext);
  const handleEdit = (detail) => {
    console.log(detail);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>

            <TableCell align="center">Is Current</TableCell>
            <TableCell align="center">Start Year</TableCell>
            <TableCell align="center">End Year</TableCell>
            <TableCell align="center">Semester Order</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <TableRow
              key={detail.semesterId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {detail.startDate}
              </TableCell>
              <TableCell align="center">
                {detail.isCurrent ? "True" : "False"}
              </TableCell>
              <TableCell align="center">{detail.startingYear}</TableCell>
              <TableCell align="center">{detail.endingYear}</TableCell>
              <TableCell align="center">{detail.semOrder}</TableCell>

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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SemesterListTable;
