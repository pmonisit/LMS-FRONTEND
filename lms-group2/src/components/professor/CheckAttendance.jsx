// React
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "moment";

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
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";

// Service
import * as lectureService from "../../services/professor/LectureService";
import * as attendanceService from "../../services/professor/AttendanceService";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

const CheckAttendance = () => {
  const [lectureId, setLectureId] = useState(0);

  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const { onOpenSnackbar } = useContext(UserInterfaceContext);

  const date = Moment().format("MMMM DD, YYYY");

  const params = useParams();

  useEffect(() => {
    lectureService.getProfLoad().then((response) => {
      setLectureId(response.data[0][0]);
    });
    attendanceService
      .getAllAttendanceByLecture(lectureId, params.id)
      .then((response) => {
        // console.log(response.data?.[0]);
        setStudentInfo(response.data?.[0]);
        setAttendanceDetails(response?.data);
      });
  }, [lectureId, attendanceDetails, params.id, studentInfo]);

  const handlePresent = () => {
    attendanceService
      .markAsPresent(lectureId, params.id)
      .then((response) => {
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: `Attendance for today has been tagged successfully`,
        });
      })
      .catch((error) => {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: `Attendance has already been logged for today. If you want to change, kindly click the edit icon.`,
        });
      });
  };

  const handleLate = () => {
    attendanceService
      .markAsLate(lectureId, params.id)
      .then((response) => {
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: `Attendance for today has been tagged successfully`,
        });
      })
      .catch((error) => {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: `Attendance has already been logged for today. If you want to change, kindly click the edit icon.`,
        });
      });
  };

  const handleAbsent = () => {
    attendanceService
      .markAsAbsent(lectureId, params.id)
      .then((response) => {
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: `Attendance for today has been logged successfully`,
        });
      })
      .catch((error) => {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: `Attendance has already been logged for today. If you want to change, kindly click the edit icon.`,
        });
      });
  };

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
          marginBottom={3}
          marginTop={4}
          variant="h4"
          textAlign="center"
        >
          <strong>
            {" "}
            {studentInfo?.[4]} {studentInfo?.[6]}
          </strong>
        </Typography>
        <Typography
          marginBottom={3}
          marginTop={4}
          variant="body1"
          textAlign="center"
        >
          Date Today: {date}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          marginBottom={5}
          justifyContent="center"
        >
          <Chip label="Present" color="success" onClick={handlePresent} />
          <Chip label="Late" color="warning" onClick={handleLate} />
          <Chip label="Absent" color="error" onClick={handleAbsent} />
        </Stack>

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
                    <Tooltip title="Edit Grade">
                      <Link
                        to={`/professor/dashboard/editAttendance/${row[0]}`}
                      >
                        <EditIcon
                          color="primary"
                          variant="outlined"
                          size="small"
                          cursor="pointer"
                        />
                      </Link>
                    </Tooltip>{" "}
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
