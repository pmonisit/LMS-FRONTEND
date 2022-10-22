import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { useReactToPrint } from "react-to-print";

const StudentSchedulePage = () => {
  const navigate = useNavigate();
  const { onOpenSnackbar, snackbarConfig, onCloseSnackbar } =
    useContext(UserInterfaceContext);
  const [currentSem, setCurrentSem] = useState([]);
  const [myEnrolledSLoads, setMyEnrolledSLoads] = useState([]);
  const [myTempSLoads, setMyTempSLoads] = useState([]);
  let isConflict = false;

  useEffect(() => {
    semesterService
      .getCurrentSemester()
      .then((response) => {
        setCurrentSem(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Semester may have already been deleted.");
        }
      });

    studentLoadService
      .getMyEnrolledStudentLoads()
      .then((response) => {
        setMyEnrolledSLoads(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Lecture may have already been deleted.");
        }
      });

    studentLoadService
      .getMyTempLoad()
      .then((response) => {
        setMyTempSLoads(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Lecture may have already been deleted.");
        }
      });
  }, []);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Schedule",
  });

  const scheduleColumns = [
    { id: "M", label: "Monday", minWidth: 100, align: "center" },
    { id: "T", label: "Tuesday", minWidth: 100, align: "center" },
    { id: "W", label: "Wednesday", minWidth: 100, align: "center" },
    { id: "Th", label: "Thursday", minWidth: 100, align: "center" },
    { id: "F", label: "Friday", minWidth: 100, align: "center" },
    { id: "S", label: "Saturday", minWidth: 100, align: "center" },
    { id: "Su", label: "Sunday", minWidth: 100, align: "center" },
  ];

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
        alert("Course may have already been deleted.");
      }
    }
  };

  const handleSchedule = (load) => {
    const sortedSchedule = load.sort((a, b) => {
      let aminute = a[6].split(":").map(Number);
      let bminute = b[6].split(":").map(Number);
      return aminute[0] * 60 + aminute[1] - (bminute[0] * 60 + bminute[1]);
    });

    const conflict = (sloadId, startTime, endTime, startDate, endDate) => {
      let result = false;
      let start = startTime.split(":").map(Number);
      let end = endTime.split(":").map(Number);
      let startMinute = start[0] * 60 + start[1];
      let endMinute = end[0] * 60 + end[1];

      sortedSchedule
        .filter((response) => response[0] !== sloadId)
        .map((data) => {
          let datastart = data[6].split(":").map(Number);
          let dataend = data[7].split(":").map(Number);
          let newStartMinute = datastart[0] * 60 + datastart[1];
          let newEndMinute = dataend[0] * 60 + dataend[1];

          if (
            startDate === data[4] ||
            startDate === data[5] ||
            (endDate !== null && (endDate === data[4] || endDate === data[5]))
          ) {
            if (newStartMinute === startMinute && newEndMinute === endMinute) {
              result = true;
              isConflict = true;
            }
            if (
              (newStartMinute > startMinute && newStartMinute < endMinute) ||
              (newEndMinute > startMinute && newEndMinute < endMinute)
            ) {
              result = true;
              isConflict = true;
            }

            if (newStartMinute < startMinute && newEndMinute > endMinute) {
              result = true;
              isConflict = true;
            }
            if (newStartMinute > startMinute && newEndMinute < endMinute) {
              result = true;
              isConflict = true;
            }
          }
          return;
        });
      return result;
    };

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
                    data[0],
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
          {myEnrolledSLoads.length > 0 ? null : (
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
  };

  const handleSubmitFoApproval = () => {
    Swal.fire({
      title: "Are you sure you want to submit this schedule?",
      showCancelButton: true,
      confirmButtonText: "Save",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        studentLoadService
          .sendForApproval()
          .then((response) => {
            console.log("success");
            onOpenSnackbar({
              open: true,
              severity: "success",
              message: "Submitted Successfully!",
            });
            window.location.reload();
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              alert(error.response.data.message[0]);
            }
          });
      }
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid>
          <Toolbar />
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
          <Grid sx={{ flexGrow: 1 }}>
            <Typography align="right">
              {myEnrolledSLoads.length > 0 ? (
                <Button
                  onClick={() => {
                    navigate("/student/enrolment");
                  }}
                  variant="outlined"
                  color="primary"
                  align="right"
                >
                  CHECK ENROLMENT SUMMARY
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/student/courses");
                  }}
                  variant="outlined"
                  color="primary"
                  align="right"
                >
                  ADD MORE COURSES
                </Button>
              )}
              {"  "}
              <Button
                onClick={() => {
                  handlePrint();
                }}
                variant="contained"
                color="primary"
              >
                PRINT
              </Button>
            </Typography>
          </Grid>
          {myEnrolledSLoads.length <= 0 ? (
            <Grid ref={componentRef}>
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
                            <TableHead
                              align="center"
                              sx={{ backgroundColor: "#ff7961" }}
                            >
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

                            <TableBody>
                              {myTempSLoads.length > 0 ? (
                                handleSchedule(myTempSLoads)
                              ) : (
                                <TableRow>
                                  <TableCell align="center" colSpan={9}>
                                    No Desired Schedule.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
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

                      <Typography align="center">
                        <Button
                          disabled={isConflict || myTempSLoads.length <= 0}
                          color="primary"
                          type="submit"
                          variant="contained"
                          onClick={() => {
                            handleSubmitFoApproval();
                          }}
                        >
                          FINALIZE
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid>
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
                            <TableHead
                              align="center"
                              sx={{ backgroundColor: "#ff7961" }}
                            >
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
                            <TableBody>
                              {myEnrolledSLoads.length > 0 ? (
                                handleSchedule(myEnrolledSLoads)
                              ) : (
                                <TableRow>
                                  <TableCell align="center" colSpan={9}>
                                    No Final Schedule.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentSchedulePage;
