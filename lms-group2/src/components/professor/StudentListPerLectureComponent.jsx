// React
import React, { useState, useEffect, useContext } from "react";
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
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

// Sweet Alert
import Swal from "sweetalert2";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as lectureService from "../../services/professor/LectureService";
import * as accountService from "../../services/shared/accounts";
import * as gradeService from "../../services/professor/GradeService";

const StudentListPerLectureComponent = () => {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const { onOpenSnackbar } = useContext(UserInterfaceContext);

  const params = useParams();

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUser(response.data[0]);
    });

    lectureService.getStudentsPerLecture(params.id).then((response) => {
      setStudents(response.data);
    });

    lectureService.getLectureById(params.id).then((response) => {
      setCourseDetails(response.data[0]);
    });
  }, [params.id, user, students, courseDetails]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      marginTop={10}
      marginBottom={15}
    >
      <Grid item xs={10} sm={10} md={10} lg={10} xl={6}>
        <Tooltip title="Back to dashboard">
          <Link to={`/professor/dashboard/${user[0]}`}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Typography marginBottom={5} marginTop={4} variant="h6" color="#b71c1c">
          LIST OF STUDENTS
        </Typography>

        <Grid container spacing={2} textAlign="left" marginBottom={1}>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong> Course Name: </strong> {courseDetails[3]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong>Day Schedule: </strong> {courseDetails[12]}{" "}
              {courseDetails[13]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong> Section:</strong> {courseDetails[11]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong>Time Schedule: </strong> {courseDetails[14]}
              {" - "}
              {courseDetails[15]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong>Semester: </strong> {courseDetails[23]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={4} variant="body1">
              <strong>School Year: </strong> {courseDetails[21]}
              {" - "}
              {courseDetails[22]}
            </Typography>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Current Grade</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Attendance</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row) => (
                <TableRow key={row[0]}>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell align="center">{row[8]}</TableCell>
                  <TableCell>
                    {row[9] === "PASSED" ? (
                      <Chip label="Passed" color="success" />
                    ) : row[9] === "CONDITIONAL" ? (
                      <Chip label="Conditional" color="warning" />
                    ) : row[9] === "FAILED" ? (
                      <Chip label="Failed" color="primary" />
                    ) : (
                      "No Evaluation Given"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Check attendance">
                      <Link
                        to={`/professor/dashboard/checkAttendance/${row[0]}/${row[6]}`}
                      >
                        <EventAvailableIcon color="primary" />
                      </Link>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {row[10] === "FINAL" ? (
                      "GRADE IS FINAL"
                    ) : (
                      <Stack spacing={2} direction="row">
                        {" "}
                        <Tooltip title="Edit Grade">
                          <Link
                            to={`/professor/dashboard/addGrade/${row[0]}/${row[6]}`}
                          >
                            <EditIcon color="primary" />
                          </Link>
                        </Tooltip>{" "}
                        <Tooltip title="Mark Grade As Final">
                          <BookmarkAddedIcon
                            color="primary"
                            variant="outlined"
                            size="small"
                            cursor="pointer"
                            onClick={() => {
                              handleClickOpen();
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to update the grade of this student again if it's final.",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Confirm",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  onOpenSnackbar({
                                    open: true,
                                    severity: "success",
                                    message: `${row[1]}'s grade is now final`,
                                  });
                                  gradeService.markGradeAsFinal(row[7]);
                                }
                              });
                            }}
                          />
                        </Tooltip>
                      </Stack>
                    )}
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

export default StudentListPerLectureComponent;
