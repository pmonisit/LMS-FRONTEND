import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as adminService from "../../../services/admin/CourseService";
import { AdminContext } from "../../../context/admin/account/adminContext";
import DegreeSelection from "../account/DegreeSelection";
import * as degreeService from "../../../services/admin/DegreeService";
import * as timeslotService from "../../../services/admin/TimeslotService";
import TimeslotSelection from "./TimeslotSelection";
const CourseForm = ({ initialValue, courseId }) => {
  const [degrees, setDegrees] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  useEffect(() => {
    degreeService.getDegree().then((res) => setDegrees(res.data));
    timeslotService.getTimeslot().then((res) => {
      setTimeslots(res.data);
    });
  }, []);
  const adminContext = useContext(AdminContext);
  const [courseForm, setCourseForm] = useState(
    initialValue
      ? initialValue
      : {
          courseCode: "",
          courseName: "",
          units: "",
          degreeId: "",
          timeslotId: "",
        }
  );

  const { courseCode, courseName, units, degreeId, timeslotId } = courseForm;

  const handleChange = (event) => {
    setCourseForm({
      ...courseForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: "100px" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(courseForm);
        if (adminContext.isEditCourse) {
          adminService
            .editCourse(courseId, courseForm)
            .then((res) => console.log(res));
          adminContext.onSetIsEditCourse(false);
        } else {
          adminService.addCourse(courseForm).then((res) => {
            console.log(res);
          });
        }
      }}
    >
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardHeader title="Table" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="courseCode"
                  onChange={handleChange}
                  value={courseCode}
                  label="Course Code"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="courseName"
                  onChange={handleChange}
                  value={courseName}
                  label="Course Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="units"
                  onChange={handleChange}
                  value={units}
                  label="Units"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="degreeId"
                  onChange={handleChange}
                  value={degreeId}
                  label="Degree ID"
                  variant="standard"
                  fullWidth
                /> */}
                <DegreeSelection
                  list={degrees}
                  form={courseForm}
                  onSetForm={setCourseForm}
                  id={courseId}
                  label="Degree"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="timeslotId"
                  onChange={handleChange}
                  value={timeslotId}
                  label="Timeslot ID"
                  variant="standard"
                  fullWidth
                /> */}
                <TimeslotSelection
                  list={timeslots}
                  form={courseForm}
                  onSetForm={setCourseForm}
                  id={timeslotId}
                  label="Time Slot"
                />
              </Grid>
            </Grid>

            <CardActions>
              <Button type="submit">Submit</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseForm;
