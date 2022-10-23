import { useState, useEffect, useContext, useRef } from "react";
import { Grid, Toolbar, Paper, Table, TableBody } from "@mui/material";
import { TableContainer, TableHead, TableCell, TableRow } from "@mui/material";
import { Button, Box, Typography } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { EnrolContext } from "../../context/student/EnrolContext";
import Sidebar from "../../components/shared/Sidebar";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";

const StudentEnrolmentPage = () => {
  const { handleSearchForClass } = useContext(EnrolContext);

  const [myRecommendedCoursesAssigned, setMyRecommendedCoursesAssigned] =
    useState([]);
  const [myDesiredSLoads, setMyDesiredSLoads] = useState([]);
  const [myEnrolledSLoads, setMyEnrolledSLoads] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);

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
          alert("Course may have already been deleted.");
        }
      });
    studentLoadService
      .getMyDesiredStudentLoads()
      .then((response) => {
        setMyDesiredSLoads(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Course may have already been deleted.");
        }
      });

    courseAssignedService
      .getMyRecommendedCourses()
      .then((response) => {
        setMyRecommendedCoursesAssigned(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Course may have already been deleted.");
        }
      });
  }, []);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Enrolment",
  });

  const coursesAssignedColumns = [
    { id: "courseCode", label: "Course\u00a0Code", minWidth: 100 },
    { id: "courseName", label: "Course\u00a0Name", minWidth: 100 },
    { id: "units", label: "Units", minWidth: 100 },
    { id: "action", label: "Remarks/Action", minWidth: 100 },
  ];
  const enrolColumns = [
    { id: "courseCode", label: "Course\u00a0Code", minWidth: 100 },
    { id: "courseName", label: "Course\u00a0Name", minWidth: 100 },
    { id: "units", label: "Units", minWidth: 100 },
    { id: "schedule", label: "Schedule", minWidth: 100 },
    { id: "section", label: "Section", minWidth: 100 },
    { id: "instructor", label: "Instructor", minWidth: 100 },
    { id: "slots", label: "Slots", minWidth: 100 },
    { id: "demand", label: "Demand", minWidth: 100 },
  ];

  const handleRemarks = (courseCode) => {
    const sl = [];
    const s2 = [];

    sl.splice(
      0,
      1,
      myEnrolledSLoads.find((demo) => demo[2] === courseCode)
    );

    s2.splice(
      0,
      1,
      myDesiredSLoads.find((demo) => demo[2] === courseCode)
    );
    if (sl[0]) {
      return (
        <Button disabled variant="contained" color="primary">
          ENROLLED
        </Button>
      );
    } else if (s2[0]) {
      return (
        <Button disabled variant="contained" color="primary">
          DESIRED
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleSearchForClass(courseCode);
          }}
        >
          SEARCH
        </Button>
      );
    }
  };

  const handleEnrolLectures = (lecture) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={lecture[1]}>
        <TableCell>{lecture[2]}</TableCell>
        <TableCell>{lecture[3]}</TableCell>
        <TableCell>{lecture[16]}</TableCell>
        <TableCell>
          {lecture[4]}
          {lecture[5]} {lecture[6]}-{lecture[7]}
        </TableCell>
        <TableCell>{lecture[8]}</TableCell>
        <TableCell>
          {lecture[13]}, {lecture[12]}
        </TableCell>
        <TableCell>{lecture[14]}</TableCell>
        <TableCell>{lecture[15]}</TableCell>
      </TableRow>
    );
  };

  const handleSumOfUnits = (load) => {
    let sum = 0;
    if (load.length > 0) {
      load.map((data) => {
        sum = sum + data[16];
        return;
      });
    }

    return sum;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid ref={componentRef}>
          <Toolbar />
          <Grid sx={{ flexGrow: 1 }}>
            <Typography align="right">
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
          <h3 align="center">
            Enrolment for {currentSem.semOrder} AY {currentSem.startingYear} -
            {currentSem.endingYear}
          </h3>
          <h4> My Advised Courses </h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead sx={{ backgroundColor: "#ff7961" }}>
                  <TableRow>
                    {coursesAssignedColumns.map((column) => (
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
                  {myRecommendedCoursesAssigned.length > 0 ? (
                    myRecommendedCoursesAssigned.map((course) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={course[0]}
                        >
                          <TableCell>{course[1]}</TableCell>
                          <TableCell>{course[2]}</TableCell>
                          <TableCell>{course[3]}</TableCell>
                          <TableCell>{handleRemarks(course[1])}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={9}>
                        No Advised Courses.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <br />
          <h4>
            My Enrolled Courses {handleSumOfUnits(myEnrolledSLoads)} units
          </h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead sx={{ backgroundColor: "#ff7961" }}>
                  <TableRow>
                    {enrolColumns.map((column) => (
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
                    myEnrolledSLoads.map((lecture) => {
                      return handleEnrolLectures(lecture);
                    })
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={9}>
                        No Enrolled Courses.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <br />
          <h4> My Desired Courses {handleSumOfUnits(myDesiredSLoads)} units</h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead sx={{ backgroundColor: "#ff7961" }}>
                  <TableRow>
                    {enrolColumns.map((column) => (
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
                  {myDesiredSLoads.length > 0 ? (
                    myDesiredSLoads.map((lecture) => {
                      return handleEnrolLectures(lecture);
                    })
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={9}>
                        No Desired Courses.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Box>
    </Box>
  );
};
export default StudentEnrolmentPage;
