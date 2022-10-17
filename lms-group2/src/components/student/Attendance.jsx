import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, Toolbar, Box, Button, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as attendanceService from "../../services/professor/AttendanceService";
import * as semesterService from "../../services/admin/Semester";

const Attendance = () => {
  const calendarComponentRef = useRef(null);
  const [events, setEvents] = useState({ title: "", start: "" });
  const [currentSem, setCurrentSem] = useState([]);

  useEffect(() => {
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      attendanceService.getAllMyAtttendancePerSem(semId).then((res) => {
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
    </Box>
  );
};

export default Attendance;
