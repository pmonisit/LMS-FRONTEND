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

const StudentGrade = () => {
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

  return (
    <>
      <h4> View Grade </h4>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Math 101</TableCell>
                <TableCell>A</TableCell>
                <TableCell>Prof. Prince</TableCell>
                <TableCell>3</TableCell>
                <TableCell>2.5</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};
export default StudentGrade;
