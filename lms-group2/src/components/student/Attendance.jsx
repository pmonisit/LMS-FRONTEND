import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Toolbar, Box, Button, Typography } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as attendanceService from "../../services/professor/AttendanceService";
import * as semesterService from "../../services/admin/Semester";

const Attendance = () => {
  const navigate = useNavigate();
  const calendarComponentRef = useRef(null);
  const [events, setEvents] = useState({ title: "", start: "" });
  const [currentSem, setCurrentSem] = useState([]);

  useEffect(() => {
    semesterService
      .getCurrentSemester()
      .then((response) => {
        setCurrentSem(response.data);
        const semId = response.data.semesterId;
        attendanceService
          .getAllMyAtttendancePerSem(semId)
          .then((res) => {
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
    <Box>
      <Toolbar />
      <Grid>
        <h2 align="center">
          Attendance for {currentSem.semOrder} AY {currentSem.startingYear} -
          {currentSem.endingYear}
        </h2>

        <Typography align="center">
          <Button
            onClick={() => {
              navigate("/student/attendance/viewlist");
            }}
            color="primary"
            type="submit"
            variant="outlined"
          >
            VIEW ATTENDANCE BY LIST
          </Button>
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
    </Box>
  );
};

export default Attendance;
