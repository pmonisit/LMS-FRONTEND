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

const LectureListTable = ({ details }) => {
  const adminContext = useContext(AdminContext);
  const handleEdit = (detail) => {
    console.log(detail);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Course</TableCell>
            <TableCell align="center">Section</TableCell>

            <TableCell align="center">Professor Name</TableCell>

            <TableCell align="center">Semester</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <TableRow
              key={detail[0]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {detail[3]}
              </TableCell>
              <TableCell component="th" scope="row" align="center">
                {detail[10]}
              </TableCell>

              <TableCell align="center">{`${detail[7]} ${detail[9]}`}</TableCell>
              <TableCell align="center">For Request</TableCell>

              <TableCell align="center">
                <IconButton
                  LinkComponent={Link}
                  to={`/admin/lecture-details/${detail[0]}`}
                >
                  <ArrowForwardIcon />
                </IconButton>
                <IconButton
                // onClick={() => {
                //   adminContext.onSetIsEditSemester(true);
                // }}
                // LinkComponent={Link}
                // to={`/admin/lecture/${detail.lectureId}/edit`}
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

export default LectureListTable;
