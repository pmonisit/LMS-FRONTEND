import Box from "@mui/material/Box";
import Sidebar from "../../components/shared/Sidebar";
import { useContext, useState } from "react";
import { AttendanceContext } from "../../context/student/AttendanceContext";
import { Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const StudentAttendanceListPage = () => {
  const {
    events,
    currentSem,
    attendanceCurrentSem,
    lecturesBySem,
    handleViewAttendance,
    handleGetLectureAttendance,
  } = useContext(AttendanceContext);

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
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box>
          <Toolbar />
          <h2 align="center">
            Attendance List for {currentSem.semOrder} AY{" "}
            {currentSem.startingYear} -{currentSem.endingYear}
          </h2>
          {lecturesBySem.map((lecture) => {
            return (
              <Box key={lecture[0]}>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  {lecture[0]}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={2}>
                            {lecture[2]} - {lecture[3]}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Remarks</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {handleGetLectureAttendance(lecture[2]).map((lec) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={lec[8]}
                            >
                              <TableCell>{lec[8]}</TableCell>
                              <TableCell>{lec[6]}</TableCell>
                              <TableCell>{lec[7]}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Toolbar />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default StudentAttendanceListPage;
