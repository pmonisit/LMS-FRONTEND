import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, TableContainer, Table, Typography } from "@mui/material";
import { TableHead, TableBody, TableCell } from "@mui/material";
import { TableRow, TablePagination, TableSortLabel } from "@mui/material";
import { Toolbar, FormControlLabel, Switch, Button } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import * as lectureService from "../../services/professor/LectureService";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as prereqService from "../../services/admin/Prerequisite";
import { EnrolContext } from "../../context/student/EnrolContext";
import Snackbar from "@mui/material/Snackbar";
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";
import MuiAlert from "@mui/material/Alert";

const Courses = () => {
  const navigate = useNavigate();
  const { onOpenSnackbar, snackbarConfig, onCloseSnackbar } =
    useContext(UserInterfaceContext);
  const { searchTerm, handleTypeSearch } = useContext(EnrolContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("2");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lecturesBySem, setLecturesBySem] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [prereqOfCourse, setPrereqOfCourse] = useState([]);
  const [myTempSLoads, setMyTempSLoads] = useState([]);
  const [enrolledSL, setEnrolledSL] = useState([]);
  const [desiredSL, setDesiredSL] = useState([]);
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);

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
    let lectures = [];
    let prereqCourse = [];
    lectureService
      .getAllLecturesByCurrentSem()
      .then((response) => {
        setLecturesBySem(response.data);
        lectures.push(response.data);
        lectures.map((lecture) => {
          lecture.map((a) => {
            let prereq = [];
            prereqService.getPrereqOfCourse(a[1]).then((res) => {
              prereq = [a[0], a[1], a[2], res.data];
              prereqCourse.push(prereq);
              setPrereqOfCourse(prereqCourse);
            });
          });
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Lecture may have already been deleted.");
        }
      });

    courseAssignedService
      .getMyCourses()
      .then((response) => {
        setMyCoursesAssigned(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Course may have already been deleted.");
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

    studentLoadService
      .getMyEnrolledStudentLoads()
      .then((response) => {
        setEnrolledSL(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Course may have already been deleted.");
        }
      });

    studentLoadService
      .getMyDesiredStudentLoads()
      .then((response) => {
        setDesiredSL(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Course may have already been deleted.");
        }
      });
  }, []);

  const columns = [
    { id: "2", label: "Course\u00a0Code" },
    { id: "3", label: "Course\u00a0Name" },
    { id: "5", label: "Restriction" },
    { id: "18", label: "Units" },
    { id: "12", label: "Schedule" },
    { id: "11", label: "Section" },
    { id: "10", label: "Instructor" },
    { id: "16", label: "Slots" },
    { id: "17", label: "Demand" },
  ];

  const handleAddToSchedule = async (lectureId) => {
    let lecture = lecturesBySem.find((data) => data[0] === lectureId);
    try {
      await studentLoadService.addClassToSched(lectureId).then((response) => {
        console.log("success");
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Course may have already been deleted.");
      }
    }
    try {
      await studentLoadService.getMyTempLoad().then((response) => {
        setMyTempSLoads(response.data);
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Course may have already been deleted.");
      }
    }

    if (lecture && lecture[16] == 0) {
      onOpenSnackbar({
        open: true,
        severity: "info",
        message:
          "There are no more slots for this course. This will be added to your desired schedule.",
      });
    } else {
      onOpenSnackbar({
        open: true,
        severity: "success",
        message: "Added successfully.",
      });
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
        alert("Course may have already been deleted.");
      }
    }
  };

  const renderEnrolActions = (lectureId, courseId) => {
    const courseAssigned = myCoursesAssigned.find(
      (data) => data[0] === courseId
    );

    const enrolled = enrolledSL.find((data) => data[1] === lectureId);

    const desired = desiredSL.find((data) => data[1] === lectureId);

    const prereq = prereqOfCourse.find(
      (data) => data[1] === courseId && data[3].length > 0
    );

    const temp = myTempSLoads.find((data) => data[1] === lectureId);

    if (courseAssigned) {
      if (courseAssigned[5] === "TAKEN") {
        return (
          <Button variant="contained" color="primary" disabled>
            TAKEN
          </Button>
        );
      } else if (enrolled) {
        return (
          <Button disabled variant="contained" color="primary">
            ENROLLED
          </Button>
        );
      } else if (desired) {
        return (
          <Button disabled variant="contained" color="primary">
            DESIRED
          </Button>
        );
      } else if (prereq) {
        return (
          <>
            <Button disabled variant="contained" color="primary">
              ADD
            </Button>
            <div>
              <sub>
                <font color="#d32f2f">
                  <i>*with prerequisite</i>
                </font>
              </sub>
            </div>
          </>
        );
      } else if (temp) {
        return (
          <Button
            onClick={() => {
              handleRemoveToSchedule(temp[0]);
            }}
            variant="contained"
            color="primary"
          >
            REMOVE
          </Button>
        );
      } else {
        return (
          <Button
            onClick={() => {
              handleAddToSchedule(lectureId);
            }}
            variant="contained"
            color="primary"
          >
            ADD
          </Button>
        );
      }
    } else {
      return (
        <>
          <Button disabled variant="contained" color="primary">
            ADD
          </Button>
          <div>
            <sub>
              <font color="#d32f2f">
                <i>*this course is restricted</i>
              </font>
            </sub>
          </div>
        </>
      );
    }
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const EnhancedTableHead = (props) => {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead sx={{ backgroundColor: "#ff7961" }}>
        <TableRow>
          {columns.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="center"
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell>Render/Actions</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - lecturesBySem.length) : 0;

  const filtered = lecturesBySem.filter((value) => {
    if (searchTerm === undefined) {
      return value;
    } else if (searchTerm === "") {
      return value;
    } else if (value[3].toLowerCase().includes(searchTerm.toLowerCase())) {
      return value;
    } else if (value[2].toLowerCase().includes(searchTerm.toLowerCase())) {
      return value;
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
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
      <h3 align="center">
        Enrolment for {currentSem.semOrder} AY {currentSem.startingYear} -
        {currentSem.endingYear}
      </h3>
      <>{handleTypeSearch()}</>
      <br />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={lecturesBySem.length}
            />
            <TableBody>
              {lecturesBySem.length > 0 ? (
                !filtered.length ? (
                  <TableRow>
                    <TableCell align="center" colSpan={10}>
                      No Match Found.
                    </TableCell>
                  </TableRow>
                ) : (
                  stableSort(filtered, getComparator(order, orderBy))
                    .map((lecture) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={lecture[0]}
                        >
                          <TableCell>{lecture[2]}</TableCell>
                          <TableCell>{lecture[3]}</TableCell>
                          <TableCell>
                            <i>for</i> {lecture[4]}
                          </TableCell>
                          <TableCell>{lecture[18]}</TableCell>
                          <TableCell>
                            {lecture[12]}
                            {lecture[13]} {lecture[14]}-{lecture[15]}
                          </TableCell>
                          <TableCell>{lecture[11]}</TableCell>
                          <TableCell>
                            {lecture[10]}, {lecture[8]}, {lecture[9]}
                          </TableCell>
                          <TableCell>{lecture[16]}</TableCell>
                          <TableCell>{lecture[17]}</TableCell>
                          <TableCell>
                            {renderEnrolActions(lecture[0], lecture[1])}
                          </TableCell>
                        </TableRow>
                      );
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                )
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={9}>
                    No Available Courses.
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={lecturesBySem.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <Typography align="right">
        <Button
          onClick={() => {
            navigate("/student/enrolment");
          }}
          variant="outlined"
          color="primary"
          align="right"
        >
          CHECK YOUR ENROLMENT SUMMARY
        </Button>
        {"  "}
        <Button
          onClick={() => {
            navigate("/student/schedule");
          }}
          variant="outlined"
          color="primary"
          align="right"
        >
          CHECK YOUR SCHEDULE
        </Button>
      </Typography>
    </Box>
  );
};

export default Courses;
