import React, { createContext, useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as attendanceService from "../../services/professor/AttendanceService";
import { Button, Grid } from "@mui/material";
import * as semesterService from "../../services/admin/Semester";

const Attendance = () => {
  const calendarComponentRef = useRef(null);
  const [events, setEvents] = useState({ title: "", start: "" });
  const [attendancePerSem, setAttendancePerSem] = useState([]);
  const [attendanceCurrentSem, setAttendanceCurrentSem] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);

  useEffect(() => {
    // attendanceService.getMyAttendancesByLectureId(5).then((res) => {});
    let attendanceBySem = [];
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      attendanceService.getAllMyAtttendancePerSem(semId).then((res) => {
        console.log(semId);
        console.log(res.data);
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

  const handleLoop = () => {
    console.log(events);
  };

  return (
    <Grid>
      <h3 align="center">
        Attendance for {currentSem.semOrder} AY {currentSem.startingYear} -
        {currentSem.endingYear}
      </h3>
      <div className="demo-app">
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            ref={calendarComponentRef}
            events={events}
          />
          <Button onClick={handleLoop}>Test</Button>
        </div>
      </div>
    </Grid>
  );
};

export default Attendance;
