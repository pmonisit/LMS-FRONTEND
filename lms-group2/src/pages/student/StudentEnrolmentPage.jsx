import { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import * as courseService from "../../services/admin/CourseService";
import * as lectureService from "../../services/student/LectureService";
import { EnrolContext } from "../../context/student/EnrolContext";

const StudentEnrolmentPage = () => {
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    courseService.getCourse().then((response) => {
      setCourses(response.data);
    });
  }, []);
  useEffect(() => {
    lectureService.getLecture().then((response) => {
      setLectures(response.data);
    });
  }, []);
  const { columns, renderEnrolActions } = useContext(EnrolContext);

  // const columns = [
  //   { id: "courseCode", label: "Course Code", minWidth: 100 },
  //   { id: "courseName", label: "Course Name", minWidth: 100 },
  //   { id: "restriction", label: "Restriction", minWidth: 100 },
  //   { id: "units", label: "Units", minWidth: 100 },
  //   { id: "schedule", label: "Schedule", minWidth: 100 },
  //   { id: "section", label: "Section", minWidth: 100 },
  //   { id: "instructor", label: "Instructor", minWidth: 100 },
  //   { id: "slots", label: "Slots", minWidth: 100 },
  //   { id: "demand", label: "Demand", minWidth: 100 },
  //   { id: "action", label: "Action", minWidth: 100 },
  // ];
  return (
    <>
      <h4> Advised Courses </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              {/* <TableRow>
                <TableCell>Course Code</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Restriction</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Slots</TableCell>
                <TableCell>Demand</TableCell>
                <TableCell>Action</TableCell>
              </TableRow> */}
            </TableHead>
            <TableBody>
              {courses.map((course) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={course.courseId}
                  >
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>Restriction</TableCell>
                    <TableCell>{course.units}</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Slots</TableCell>
                    <TableCell>Demand</TableCell>
                    <TableCell>{renderEnrolActions(course)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <h4> My Desired Schedule </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Monday</TableCell>
                <TableCell>Tuesday</TableCell>
                <TableCell>Wednesday</TableCell>
                <TableCell>Thursday</TableCell>
                <TableCell>Friday</TableCell>
                <TableCell>Saturday</TableCell>
                <TableCell>Sunday</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lectures.map((lecture) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={lecture.lectureId}
                  >
                    <TableCell>7:00AM-8:00AM</TableCell>
                    <TableCell>Math101 A Prof. Prince</TableCell>
                    <TableCell>Eng101 B Prof. Prince</TableCell>
                    <TableCell>Phy101 A Prof. Prince</TableCell>
                    <TableCell>Chem101 B Prof. Prince</TableCell>
                    <TableCell>Sci101 A Prof. Prince</TableCell>
                    <TableCell>ComSci101 A Prof. Prince</TableCell>
                    <TableCell>Vacant</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <h4> My Desired Classes </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              {/* <TableRow>
                <TableCell>Course Code</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell>Restriction</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Slots</TableCell>
                <TableCell>Demand</TableCell>
                <TableCell>Action</TableCell>
              </TableRow> */}
            </TableHead>
            <TableBody>
              {courses.map((course) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={course.courseId}
                  >
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell>Restriction</TableCell>
                    <TableCell>{course.units}</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Instructor</TableCell>
                    <TableCell>Slots</TableCell>
                    <TableCell>Demand</TableCell>
                    <TableCell>{renderEnrolActions(course)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        LinkComponent={Link}
        to="/courses"
      >
        ENROL COURSES
      </Button>
    </>
  );
};
export default StudentEnrolmentPage;
