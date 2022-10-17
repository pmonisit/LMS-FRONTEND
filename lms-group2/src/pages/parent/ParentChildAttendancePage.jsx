import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Grid, Toolbar, Box, Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as semesterService from "../../services/admin/Semester";
import * as attendanceService from "../../services/professor/AttendanceService";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ParentChildAttendance = () => {
  const calendarComponentRef = useRef(null);
  const [events, setEvents] = useState({ title: "", start: "" });
  const [attendanceCurrentSem, setAttendanceCurrentSem] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [lecturesBySem, setLecturesBySem] = useState([]);

  useEffect(() => {
    let attendanceBySem = [];
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      attendanceService
        .parentGetAllMyAttendancesBySemesterId(semId)
        .then((res) => {
          console.log(res.data);
          attendanceBySem.push(res.data);
          setAttendanceCurrentSem(...attendanceBySem);
          setEvents(
            res.data.map((a) => {
              return {
                ...events,
                title: a[0] + " - " + a[7],
                start: a[6],
                color:
                  a[7] === "PRESENT"
                    ? "blue"
                    : a[7] === "LATE"
                    ? "green"
                    : "red",
              };
            })
          );
        });
    });
  }, []);

  return (
    <Grid>
      <Toolbar />
      <Tooltip title="Back to dashboard">
        <Link to={`/parent/dashboard`}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Grid>
        <h2 align="center">
          Attendance for {currentSem.semOrder} AY {currentSem.startingYear} -
          {currentSem.endingYear}
        </h2>

        <Typography align="center">
          <Link to="viewlist">
            <Button color="primary" type="submit" variant="contained">
              VIEW ATTENDANCE BY LIST
            </Button>
          </Link>
        </Typography>
        <div className="demo-app">
          <div className="demo-app-calendar">
            <FullCalendar
              plugins={[dayGridPlugin]}
              ref={calendarComponentRef}
              events={events}
              headerToolbar={{
                left: "prev today",
                center: "title",
                right: "next",
              }}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ParentChildAttendance;
