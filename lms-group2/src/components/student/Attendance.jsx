import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as attendanceService from "../../services/professor/AttendanceService";
import { Grid, Toolbar, Box } from "@mui/material";
import * as semesterService from "../../services/admin/Semester";

const Attendance = () => {
  const calendarComponentRef = useRef(null);
  const [events, setEvents] = useState({ title: "", start: "" });
  const [attendancePerSem, setAttendancePerSem] = useState([]);
  const [attendanceCurrentSem, setAttendanceCurrentSem] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);

  useEffect(() => {
    let attendanceBySem = [];
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      attendanceService.getAllMyAtttendancePerSem(semId).then((res) => {
        attendanceBySem.push(res.data);
        setAttendancePerSem(...attendanceBySem);
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
    });
  }, []);

  return (
    <Box>
      <Toolbar />
      <Grid>
        <h2 align="center">
          Attendance for {currentSem.semOrder} AY {currentSem.startingYear} -
          {currentSem.endingYear}
        </h2>
        <div className="demo-app">
          <div className="demo-app-calendar">
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin]}
              ref={calendarComponentRef}
              events={events}
            />
          </div>
        </div>
      </Grid>
    </Box>
  );
};

export default Attendance;
