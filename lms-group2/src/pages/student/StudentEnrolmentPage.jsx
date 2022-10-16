import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { EnrolContext } from "../../context/student/EnrolContext";
import Sidebar from "../../components/shared/Sidebar";

const StudentEnrolmentPage = () => {
  const {
    coursesAssignedColumns,
    enrolColumns,
    myRecommendedCoursesAssigned,
    handleRemarks,
    myDesiredSLoads,
    myEnrolledSLoads,
    currentSem,
    handleEnrolLectures,
  } = useContext(EnrolContext);

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
              <Table>
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
                          <TableCell>{course[0]}</TableCell>
                          <TableCell>{course[1]}</TableCell>
                          <TableCell>{course[2]}</TableCell>
                          <TableCell>{handleRemarks(course[0])}</TableCell>
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

                  {}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <h4> My Enrolled Courses</h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
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
          <h4> My Desired Courses</h4>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
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
