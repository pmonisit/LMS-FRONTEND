import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";
import Joi from "joi";
import TimeslotSelection from "./TimeslotSelection";

const CourseForm = ({ initialValue, courseId }) => {
  const [errors, setErrors] = useState({});
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const navigate = useNavigate();
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

    const { error } = schema
      .extract(event.currentTarget.name)
      .label(event.currentTarget.name)
      .validate(event.currentTarget.value);
    if (error) {
      setErrors({
        ...errors,
        [event.currentTarget.name]: error.details[0].message,
      });
    } else {
      delete errors[event.currentTarget.name];
      setErrors(errors);
    }
  };

  const schema = Joi.object({
    courseCode: Joi.string().min(3).required(),
    courseName: Joi.string().min(5).required(),
    units: Joi.number().required(),
    degreeId: Joi.optional(),
    timeslotId: Joi.optional(),
  });

  const isCourseFormInvalid = () => {
    const result = schema.validate(courseForm);
    return !!result.error;
  };
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: "100px" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();

        if (adminContext.isEditCourse) {
          adminService
            .editCourse(courseId, courseForm)
            .then((res) => {
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a Course",
              });
              adminContext.onSetIsEditCourse(false);
              navigate("/admin/course-list");
            })
            .catch((error) => {
              if (error.response.status == 400) {
                onOpenSnackbar({
                  open: true,
                  severity: "error",
                  message: "Please fill up all the fields",
                });
              }
            });
        } else {
          adminService
            .addCourse(courseForm)
            .then((res) => {
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully added a Course",
              });
              adminContext.onSetIsEditCourse(false);
              navigate("/admin/course-list");
            })
            .catch((error) => {
              if (error.response.status == 400) {
                onOpenSnackbar({
                  open: true,
                  severity: "error",
                  message: "Please fill up all the fields",
                });
              }
            });
        }
      }}
    >
      <Grid item xs={10} md={4} sm={6} lg={4}>
        <Card>
          <CardHeader title="Add Course Form" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="courseCode"
                  onChange={handleChange}
                  value={courseCode}
                  error={!!errors.courseCode}
                  helperText={errors.courseCode}
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
                  error={!!errors.courseName}
                  helperText={errors.courseName}
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
                  error={!!errors.units}
                  helperText={errors.units}
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
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isCourseFormInvalid()}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseForm;
