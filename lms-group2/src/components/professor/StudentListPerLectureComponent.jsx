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
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

// Service
import * as lectureService from "../../services/professor/LectureService";
import * as accountService from "../../services/shared/accounts";
import * as gradeService from "../../services/professor/GradeService";

const StudentListPerLectureComponent = () => {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUser(response.data[0]);
    });

    lectureService.getStudentsPerLecture(params.id).then((response) => {
      setStudents(response.data);
    });

    lectureService.getProfLoad().then((response) => {
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
    <Grid container justifyContent="center" component="form" marginTop={10}>
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
              <strong> Course Name: </strong> {courseDetails[2]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong>Day Schedule: </strong> {courseDetails[3]}{" "}
              {courseDetails[4]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong> Section:</strong> {courseDetails[7]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={1} variant="body1">
              <strong>Time Schedule: </strong> {courseDetails[5]}
              {" - "}
              {courseDetails[6]}
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} md={6} lg={6} xl={6}>
            <Typography marginBottom={4} variant="body1">
              <strong>Status: </strong>{" "}
              {courseDetails[9] === true ? "On-Going" : "Completed"}
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
                      "Not Yet Evaluated"
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Check attendance">
                      <Link
                        to={`/professor/dashboard/checkAttendance/${row[0]}`}
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
                            to={`/professor/dashboard/addGrade/${row[0]}/${row[7]}`}
                          >
                            <EditIcon color="primary" />
                          </Link>
                        </Tooltip>{" "}
                        <Dialog open={open} onClose={handleClose}>
                          <DialogTitle>{" Are you sure?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              You won't be able to update the grade of this
                              student again.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                              onClick={() => {
                                handleClose();
                                gradeService.markGradeAsFinal(row[7]);
                              }}
                            >
                              Confirm
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <BookmarkAddedIcon
                          color="primary"
                          variant="outlined"
                          size="small"
                          cursor="pointer"
                          onClick={() => {
                            handleClickOpen();
                            //gradeService.markGradeAsFinal(row[7]);
                          }}
                        />
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
