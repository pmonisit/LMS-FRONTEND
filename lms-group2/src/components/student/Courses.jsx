import { useState, useEffect, useContext, Fragment } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as courseService from "../../services/admin/CourseService";
import * as lectureService from "../../services/professor/LectureService";
import { EnrolContext } from "../../context/student/EnrolContext";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div align="center">
        <input
          type="text"
          placeholder="Search Course..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
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
            </TableHead>
            <TableBody>
              {courses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((value) => {
                  if (searchTerm == "") {
                    return value;
                  } else if (
                    value.courseName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  } else if (
                    value.courseCode
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((course) => {
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
                      {lectures
                        .filter(
                          (lecture) => course.courseId === lecture.courseId
                        )
                        .map((lecture) => {
                          return (
                            <Fragment key={lecture.lectureId}>
                              <TableCell>{lecture.schedule}</TableCell>
                              <TableCell>{lecture.section}</TableCell>
                              <TableCell>Instructor</TableCell>
                              <TableCell>Slots</TableCell>
                              <TableCell>Demand</TableCell>
                            </Fragment>
                          );
                        })}

                      <TableCell>{renderEnrolActions(course)}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
export default Courses;
