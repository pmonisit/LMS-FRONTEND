import Box from "@mui/material/Box";
import Sidebar from "../../components/shared/Sidebar";
import { useState, useEffect } from "react";
import { Toolbar, Paper, TableContainer, Table } from "@mui/material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import * as semesterService from "../../services/admin/Semester";
import * as attendanceService from "../../services/professor/AttendanceService";
import * as lectureService from "../../services/professor/LectureService";

const StudentAttendanceListPage = () => {
  const [events, setEvents] = useState({ title: "", start: "" });
  const [attendanceCurrentSem, setAttendanceCurrentSem] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [lecturesBySem, setLecturesBySem] = useState([]);

  useEffect(() => {
    let attendanceBySem = [];
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      attendanceService.getAllMyAtttendancePerSem(semId).then((res) => {
        attendanceBySem.push(res.data);
        setAttendanceCurrentSem(...attendanceBySem);
        setEvents(
          res.data.map((a) => {
            return {
              ...events,
              title: a[0] + " - " + a[7],
              start: a[6],
              color:
                a[7] === "PRESENT" ? "blue" : a[7] === "LATE" ? "green" : "red",
            };
          })
        );
      });

      let lecturesBySem = [];
      lectureService.getAllLecturesBySemID(semId).then((response) => {
        lecturesBySem.push(response.data);
        lecturesBySem.map((data) => {
          setLecturesBySem(data);
        });
      });
    });
  }, []);

  const handleGetLectureAttendance = (lectureCode) => {
    return attendanceCurrentSem
      .filter((lecture) => lecture[0] === lectureCode)
      .map((data) => {
        return data;
      });
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
