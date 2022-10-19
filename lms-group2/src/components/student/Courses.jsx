import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, TableContainer, Table } from "@mui/material";
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

const Courses = () => {
  const { searchTerm, handleTypeSearch } = useContext(EnrolContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("2");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lecturesBySem, setLecturesBySem] = useState([]);
  const [lectureObject, setLectureObject] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [prereqOfCourse, setPrereqOfCourse] = useState([]);
  const [enrolItems, setEnrolItems] = useState([]);
  const [tempEnrolItems, setTempEnrolItems] = useState([]);
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);
  const [enrolText, setEnrolText] = useState("ENROL");
  const [unenrolText, setUnEnrolText] = useState("UNENROL");
  const [addText, setAddText] = useState("ADD");
  const [removeText, setRemoveText] = useState("REMOVE");

  useEffect(() => {
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      let lecturesBySem = [];
      let prereqCourse = [];
      lectureService.getAllLecturesBySemID(semId).then((response) => {
        lecturesBySem.push(response.data);
        lecturesBySem.map((data) => {
          setLecturesBySem(data);
          let arrobj = [];
          data.map((a) => {
            let obj = { ...a };
            arrobj.push(obj);
            setLectureObject(arrobj);
            let prereq = [];
            prereqService.getPrereqOfCourse(a[1]).then((response) => {
              prereq = [a[2], response.data];
              prereqCourse.push(prereq);
              setPrereqOfCourse(prereqCourse);
            });
          });
        });
      });
    });
    studentLoadService.getAllMyStudentLoads().then((response) => {
      setEnrolItems(response.data);
    });
    studentLoadService.getMyTempLoad().then((response) => {
      setTempEnrolItems(response.data);
    });
    courseAssignedService.getMyCourses().then((response) => {
      setMyCoursesAssigned(response.data);
    });
  }, []);

  const columns = [
    { id: "2", label: "Course\u00a0Code", minWidth: 100 },
    { id: "3", label: "Course\u00a0Name", minWidth: 100 },
    { id: "5", label: "Restriction", minWidth: 100 },
    { id: "18", label: "Units", minWidth: 100 },
    { id: "12", label: "Schedule", minWidth: 100 },
    { id: "11", label: "Section", minWidth: 100 },
    { id: "10", label: "Instructor", minWidth: 100 },
    { id: "16", label: "Slots", minWidth: 100 },
    { id: "17", label: "Demand", minWidth: 100 },
  ];

  const handleAddToSchedule = (lectureId) => {
    studentLoadService.addClassToSched(lectureId);
    setAddText("ADD");
  };

  const handleRemoveToSchedule = (sloadId) => {
    studentLoadService.deleteStudentLoad(sloadId);
    setRemoveText("REMOVE");
  };

  const handleEnrol = (lectureId) => {
    studentLoadService.addStudentLoad(lectureId);
    setEnrolText("ENROL");
  };

  const handleUnEnrol = (sloadId) => {
    studentLoadService.deleteStudentLoad(sloadId);
    setUnEnrolText("UNENROL");
  };

  const renderEnrolActions = (lectureId, courseCode) => {
    const tempEnrolItem = [];
    const courseAssignedOrTaken = myCoursesAssigned.find(
      (data) => data[1] === courseCode
    );

    tempEnrolItems.map((data) => {
      tempEnrolItem.splice(
        0,
        1,
        tempEnrolItems.find((tempEnrolItem) => tempEnrolItem[1] === lectureId)
      );
    });
    if (tempEnrolItem[0]) {
      return (
        <Button
          onClick={() => {
            handleRemoveToSchedule(tempEnrolItem[0][0]);
          }}
          variant="contained"
          color="primary"
        >
          {removeText}
        </Button>
      );
    } else if (
      typeof courseAssignedOrTaken !== "undefined" &&
      courseAssignedOrTaken[5] === "TAKEN"
    ) {
      return (
        <Button variant="contained" color="primary" disabled>
          TAKEN
        </Button>
      );
    } else if (typeof courseAssignedOrTaken == "undefined") {
      return (
        <>
          <Button disabled variant="contained" color="primary">
            {enrolText}
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
    } else if (
      prereqOfCourse.find(
        (course) => course[0] === courseCode && course[1].length == 0
      )
    ) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleAddToSchedule(lectureId);
          }}
        >
          {addText}
        </Button>
      );
    } else {
      return (
        <>
          <Button disabled variant="contained" color="primary">
            {addText}
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
              align={headCell.numeric ? "right" : "left"}
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

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar />
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
                stableSort(lecturesBySem, getComparator(order, orderBy))
                  .filter((value) => {
                    if (searchTerm === undefined) {
                      return value;
                    } else if (searchTerm == "") {
                      return value;
                    } else if (
                      value[3].toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    } else if (
                      value[2].toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          {renderEnrolActions(lecture[0], lecture[2])}
                        </TableCell>
                      </TableRow>
                    );
                  })
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
    </Box>
  );
};

export default Courses;
