import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Grid, Toolbar, Typography, Button } from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as semesterService from "../../services/admin/Semester";
import * as attendanceService from "../../services/professor/AttendanceService";

const ParentChildAttendance = () => {
  const calendarComponentRef = useRef(null);
  const [events, setEvents] = useState({ title: "", start: "" });
  const [currentSem, setCurrentSem] = useState([]);

  useEffect(() => {
    let attendanceBySem = [];
    semesterService
      .getCurrentSemester()
      .then((response) => {
        setCurrentSem(response.data);
        const semId = response.data.semesterId;
        attendanceService
          .parentGetAllMyAttendancesBySemesterId(semId)
          .then((res) => {
            attendanceBySem.push(res.data);
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
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              alert("Attendance may have already been deleted.");
            }
          });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Semester may have already been deleted.");
        }
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
                left: "title",
                right: "prev today next",
              }}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ParentChildAttendance;
