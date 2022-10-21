import { useState, useEffect, useContext } from "react";
import { Button, Grid, Toolbar, Typography } from "@mui/material";
import { Paper, Table, TableBody, TableCell } from "@mui/material";
import { TableContainer, TableHead, TableRow, Box } from "@mui/material";
import Sidebar from "../../components/shared/Sidebar";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Snackbar from "@mui/material/Snackbar";
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";
import MuiAlert from "@mui/material/Alert";
import Swal from "sweetalert2";

const StudentSchedulePage = () => {
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const { isDarkMode, snackbarConfig, onCloseSnackbar } =
    useContext(UserInterfaceContext);
  const [currentSem, setCurrentSem] = useState([]);
  const [myEnrolledSLoads, setMyEnrolledSLoads] = useState([]);
  const [myTempSLoads, setMyTempSLoads] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [desiredSched, setDesiredSched] = useState(false);
  const [isConflict, setIsConflict] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  // let isConflict = false;
  // let isEnabled = false;

  useEffect(() => {
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
    });
    studentLoadService.getMyEnrolledStudentLoads().then((response) => {
      setMyEnrolledSLoads(response.data);
    });
    studentLoadService.getMyTempLoad().then((response) => {
      setMyTempSLoads(response.data);
    });
  }, []);

  const scheduleColumns = [
    { id: "M", label: "Monday", minWidth: 100 },
    { id: "T", label: "Tuesday", minWidth: 100 },
    { id: "W", label: "Wednesday", minWidth: 100 },
    { id: "Th", label: "Thursday", minWidth: 100 },
    { id: "F", label: "Friday", minWidth: 100 },
    { id: "S", label: "Saturday", minWidth: 100 },
    { id: "Su", label: "Sunday", minWidth: 100 },
  ];

  const handleSchedule = (load, isFinal) => {
    const sortedSchedule = load.sort((a, b) => {
      let aminute = a[6].split(":").map(Number);
      let bminute = b[6].split(":").map(Number);
      return aminute[0] * 60 + aminute[1] - (bminute[0] * 60 + bminute[1]);
    });

    const conflict = (startTime, endTime, startDate, endDate) => {
      let result = false;
      let start = startTime.split(":").map(Number);
      let end = endTime.split(":").map(Number);
      let startMinute = start[0] * 60 + start[1];
      let endMinute = end[0] * 60 + end[1];

      sortedSchedule.map((data) => {
        let datastart = data[6].split(":").map(Number);
        let dataend = data[7].split(":").map(Number);
        let newStartMinute = datastart[0] * 60 + datastart[1];
        let newEndMinute = dataend[0] * 60 + dataend[1];

        if (
          startDate === data[4] ||
          startDate === data[5] ||
          (endDate !== null && (endDate === data[4] || endDate === data[5]))
        ) {
          if (
            (newStartMinute > startMinute && newStartMinute < endMinute) ||
            (newEndMinute > startMinute && newEndMinute < endMinute)
          ) {
            result = true;
            setIsConflict(true);
          }
        }
      });
      return result;
    };

    if (sortedSchedule.length > 0) {
      return sortedSchedule.map((data) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={data[0]}>
            <TableCell>
              {data[6]} - {data[7]}
            </TableCell>
            {scheduleColumns.map((response) => {
              return (
                <TableCell
                  key={response.id}
                  sx={{
                    backgroundColor: conflict(
                      data[6],
                      data[7],
                      data[4],
                      data[5]
                    )
                      ? "#ef9a9a"
                      : "white",
                  }}
                >
                  {response.id === data[4]
                    ? data[2] + "-" + data[8]
                    : response.id === data[5]
                    ? data[2] + "-" + data[8]
                    : ""}
                </TableCell>
              );
            })}
            {isFinal ? null : (
              <TableCell align="center">
                <Button
                  onClick={() => {
                    handleRemoveToSchedule(data[0]);
                  }}
                >
                  <RemoveCircleIcon />
                </Button>
              </TableCell>
            )}
          </TableRow>
        );
      });
    } else {
      return (
        <TableRow>
          {isFinal ? (
            <TableCell align="center" colSpan={8}>
              No Final Schedule.
            </TableCell>
          ) : (
            <TableCell align="center" colSpan={9}>
              No Desired Schedule.
            </TableCell>
          )}
        </TableRow>
      );
    }
  };

  const handleRemoveToSchedule = async (sloadId) => {
    try {
      await studentLoadService.deleteStudentLoad(sloadId);
      setMyTempSLoads(myTempSLoads.filter((sloads) => sloads[0] !== sloadId));
      onOpenSnackbar({
        open: true,
        severity: "success",
        message: "Removed Successfully!",
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("This have already been deleted.");
      }
    }
  };

  const handleDesiredSchedule = () => {
    return handleSchedule(myTempSLoads, false);
  };

  const handleApprovedSchedule = () => {
    return handleSchedule(myEnrolledSLoads, true);
  };

  const handleSubmitFoApproval = () => {
    Swal.fire({
      title: "Are you sure you want to submit this schedule?",
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        studentLoadService.sendForApproval();
        setIsSubmitted(true);
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: "Submitted Successfully!",
        });
        window.location.reload();
      }
    });

    // if (window.confirm("Are you sure you want to submit this schedule?")) {
    //   studentLoadService.sendForApproval();
    //   setIsSubmitted(true);
    //   onOpenSnackbar({
    //     open: true,
    //     severity: "success",
    //     message: "Submitted Successfully!",
    //   });
    //   window.location.reload();
    // }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Snackbar
        open={snackbarConfig.open}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        onClose={onCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={onCloseSnackbar}
          severity={snackbarConfig.severity}
          sx={{ width: "100%" }}
        >
          {snackbarConfig.message}
        </MuiAlert>
      </Snackbar>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid>
          <Toolbar />
          <h3 align="center">
            Desired Schedule for {currentSem.semOrder} AY{" "}
            {currentSem.startingYear} -{currentSem.endingYear}
          </h3>
          <Grid sx={{ flexGrow: 1 }} container spacing={5}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={10}>
                <Grid item>
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead align="center">
                          <TableRow>
                            <TableCell>Time</TableCell>
                            {scheduleColumns.map((column) => {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ minWidth: column.minWidth }}
                                >
                                  {column.label}
                                </TableCell>
                              );
                            })}
                            <TableCell>Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>{handleDesiredSchedule()}</TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                  {isConflict ? (
                    <sub>
                      <i>
                        <span style={{ color: "#ef9a9a" }}>
                          * with conflict
                        </span>
                      </i>
                    </sub>
                  ) : null}
                  <br />
                  {myTempSLoads.length === 0 ? (
                    ""
                  ) : (
                    <Typography align="center">
                      <Button
                        disabled={isConflict || isSubmitted}
                        color="primary"
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          handleSubmitFoApproval();
                        }}
                      >
                        SUBMIT
                      </Button>
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Toolbar />
          <h3 align="center">
            Final Schedule for {currentSem.semOrder} AY{" "}
            {currentSem.startingYear} -{currentSem.endingYear}
          </h3>
          <Grid sx={{ flexGrow: 1 }} container spacing={5}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={10}>
                <Grid item>
                  <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 650 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead align="center">
                          <TableRow>
                            <TableCell>Time</TableCell>
                            {scheduleColumns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>{handleApprovedSchedule()}</TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentSchedulePage;
