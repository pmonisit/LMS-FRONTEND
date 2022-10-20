import { useState, useEffect, useContext } from "react";
import { Grid, Toolbar, Paper, Table, TableBody } from "@mui/material";
import { TableContainer, TableHead, TableCell, TableRow } from "@mui/material";
import { Button, Box } from "@mui/material";
import Sidebar from "../../components/shared/Sidebar";
import * as lectureService from "../../services/professor/LectureService";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as prereqService from "../../services/admin/Prerequisite";
import { EnrolContext } from "../../context/student/EnrolContext";

const StudentEnrolmentPage = () => {
  const { handleSearchForClass } = useContext(EnrolContext);

  const [myRecommendedCoursesAssigned, setMyRecommendedCoursesAssigned] =
    useState([]);
  const [myDesiredSLoads, setMyDesiredSLoads] = useState([]);
  const [myEnrolledSLoads, setMyEnrolledSLoads] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);
  const [enrolItems, setEnrolItems] = useState([]);
  const [prereqOfCourse, setPrereqOfCourse] = useState([]);
  const [enrolText, setEnrolText] = useState("ENROL");
  const [unenrolText, setUnEnrolText] = useState("UNENROL");

  useEffect(() => {
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      let lecturesBySem = [];
      let prereqCourse = [];
      lectureService.getAllLecturesBySemID(semId).then((response) => {
        lecturesBySem.push(response.data);
        lecturesBySem.map((data) => {
          data.map((a) => {
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
    studentLoadService.getMyEnrolledStudentLoads().then((response) => {
      setMyEnrolledSLoads(response.data);
    });
    studentLoadService.getMyDesiredStudentLoads().then((response) => {
      setMyDesiredSLoads(response.data);
    });
    courseAssignedService.getMyCourses().then((response) => {
      setMyCoursesAssigned(response.data);
    });
    studentLoadService.getAllMyStudentLoads().then((response) => {
      setEnrolItems(response.data);
    });
    courseAssignedService.getMyRecommendedCourses().then((response) => {
      setMyRecommendedCoursesAssigned(response.data);
    });
  }, []);

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

  const handleEnrol = (lectureId) => {
    studentLoadService.addStudentLoad(lectureId);
    setEnrolText("ENROL");
  };

  const handleUnEnrol = (sloadId) => {
    studentLoadService.deleteStudentLoad(sloadId);
    setUnEnrolText("UNENROL");
  };

  const renderEnrolActions = (lectureId, courseCode, isFinal) => {
    const enrolItem = [];
    const courseAssignedOrTaken = myCoursesAssigned.find(
      (data) => data[0] === courseCode
    );
    enrolItems.map((data) => {
      enrolItem.splice(
        0,
        1,
        enrolItems.find((enrolItem) => enrolItem[1] === lectureId)
      );
    });

    if (isFinal) {
      return;
    } else {
      if (enrolItem[0]) {
        return (
          <Button
            onClick={() => {
              handleUnEnrol(enrolItem[0][0]);
              handleEnrol(enrolItem[0][1]);
            }}
            variant="contained"
            color="primary"
          >
            ADD
          </Button>
        );
      } else if (
        typeof courseAssignedOrTaken !== "undefined" &&
        courseAssignedOrTaken[3] === "TAKEN"
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
              handleEnrol(lectureId);
            }}
          >
            {enrolText}
          </Button>
        );
      } else {
        return (
          <>
            <Button disabled variant="contained" color="primary">
              {enrolText}
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
    }
  };

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

  const handleEnrolLectures = (lecture, isFinal) => {
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
        <TableCell>
          {renderEnrolActions(lecture[1], lecture[2], isFinal)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid>
          <Toolbar />
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
                <TableHead>
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
          <h4> My Enrolled Courses</h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
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
                      let isFinal = true;
                      return handleEnrolLectures(lecture, isFinal);
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
          <h4> My Desired Courses</h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
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
                      let isFinal = true;
                      return handleEnrolLectures(lecture, isFinal);
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
