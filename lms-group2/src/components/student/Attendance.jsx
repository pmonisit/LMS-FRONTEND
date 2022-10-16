import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import * as attendanceService from "../../services/professor/AttendanceService";
import { Grid, Toolbar, Box, Button } from "@mui/material";
import * as semesterService from "../../services/admin/Semester";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AttendanceContext } from "../../context/student/AttendanceContext";

const Attendance = () => {
  const calendarComponentRef = useRef(null);
  const { events, currentSem, attendancePerSem } =
    useContext(AttendanceContext);

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
