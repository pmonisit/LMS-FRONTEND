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

const CourseListTable = ({ details }) => {
  const adminContext = useContext(AdminContext);
  const handleEdit = (detail) => {
    console.log(detail);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Course Code</TableCell>
            <TableCell align="center">Course Name</TableCell>
            <TableCell align="center">Units</TableCell>
            <TableCell align="center">Degree Id</TableCell>
            <TableCell align="center">Timeslot Id</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.map((detail) => (
            <TableRow
              key={detail.courseId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {detail.courseId}
              </TableCell>
              <TableCell align="center">{detail.courseCode}</TableCell>
              <TableCell align="center">{detail.courseName}</TableCell>
              <TableCell align="center">{detail.units}</TableCell>
              <TableCell align="center">{detail.degreeId}</TableCell>
              <TableCell align="center">{detail.timeslotId}</TableCell>
              <TableCell align="center">
                <IconButton
                  onClick={() => {
                    adminContext.onSetIsEditCourse(true);
                  }}
                  LinkComponent={Link}
                  to={`/admin/course/${detail.courseId}/edit`}
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

export default CourseListTable;
