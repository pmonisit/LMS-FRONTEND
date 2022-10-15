import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as adminService from "../../../services/admin/Semester";
import { AdminContext } from "../../../context/admin/account/adminContext";
import DaySelection from "./DaySelection";
import Day2Selection from "./Day2Selection";
import TimeSelection from "./TimeSelection";
import Time2Selection from "./Time2Selection";

const LectureForm2 = ({ lectureForm, onSetLectureForm, lectureId }) => {
  const adminContext = useContext(AdminContext);

  const {
    section,
    courseId,
    accountId,
    semesterId,
    dayOne,
    dayTwo,
    startTime,
    endTime,
    capacity,
    desired,
  } = lectureForm;

  const handleChange = (event) => {
    onSetLectureForm({
      ...lectureForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Grid container justifyContent="center" sx={{ marginTop: "5vh" }}>
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardHeader title="Table" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <TextField
                  name="dayOne"
                  onChange={handleChange}
                  value={dayOne}
                  label="Day One"
                  variant="standard"
                  fullWidth
                /> */}
                <DaySelection
                  form={lectureForm}
                  onSetForm={onSetLectureForm}
                  label="Day One"
                  id={dayOne}
                  day={dayOne}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="dayTwo"
                  onChange={handleChange}
                  value={dayTwo}
                  label="Day Two"
                  variant="standard"
                  fullWidth
                /> */}
                <Day2Selection
                  form={lectureForm}
                  onSetForm={onSetLectureForm}
                  label="Day Two"
                  id={dayTwo}
                  day={dayTwo}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="startTime"
                  onChange={handleChange}
                  value={startTime}
                  label="Start Time"
                  variant="standard"
                  fullWidth
                /> */}
                <TimeSelection
                  form={lectureForm}
                  onSetForm={onSetLectureForm}
                  label="Start Time"
                  id={lectureId}
                  time={startTime}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="endTime"
                  onChange={handleChange}
                  value={endTime}
                  label="End Time"
                  variant="standard"
                  fullWidth
                /> */}
                <Time2Selection
                  form={lectureForm}
                  onSetForm={onSetLectureForm}
                  label="End Time"
                  id={lectureId}
                  time={endTime}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="capacity"
                  onChange={handleChange}
                  value={capacity}
                  label="Capacity"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="desired"
                  onChange={handleChange}
                  value={desired}
                  label="Desired"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LectureForm2;
