// React
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Material Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

// Service
import * as lectureService from "../../services/professor/LectureService";
import * as attendanceService from "../../services/professor/AttendanceService";

const CheckAttendance = () => {
  const [lectureId, setLectureId] = useState(0);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const params = useParams();

  useEffect(() => {
    lectureService.getProfLoad().then((response) => {
      setLectureId(response.data[0][0]);
    });

    attendanceService
      .getAllAttendanceByLecture(lectureId, params.id)
      .then((response) => {
        // console.log(response.data);
        setAttendanceDetails(response.data);
        setStudentInfo(response.data[0]);
        setFirstName(studentInfo[4]);
        setLastName(studentInfo[6]);
      });
  }, [lectureId, attendanceDetails, params.id, studentInfo]);

  return (
    <Grid container justifyContent="center" component="form" marginTop={10}>
      <Grid item xs={10} sm={10} md={10} lg={10} xl={6}>
        <Tooltip title="Back to dashboard">
          <Link to={`/professor/dashboard/studentLists/${lectureId}`}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Typography
          marginBottom={5}
          marginTop={4}
          variant="h6"
          color="#b71c1c"
          textAlign="center"
        >
          ATTENDANCE
        </Typography>
        <Typography
          marginBottom={5}
          marginTop={4}
          variant="body1"
          textAlign="center"
        >
          <strong>
            {firstName} {lastName}
          </strong>
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceDetails.map((row) => (
                <TableRow key={row[0]}>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default CheckAttendance;
