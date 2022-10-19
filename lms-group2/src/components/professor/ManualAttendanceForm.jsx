// React
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Material Components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Service
import * as attendanceService from "../../services/professor/AttendanceService";
import * as gradeService from "../../services/professor/GradeService";

// JOI
import Joi from "joi";

const ManualAttendanceForm = ({ onSubmit }) => {
  const [studentDetails, setStudentDetails] = useState([]);
  const params = useParams();

  const [form, setForm] = useState({
    attendanceDate: "",
    status: "",
  });

  useEffect(() => {
    gradeService
      .getStudentGradePerLecture(params.studentId, params.lectureId)
      .then((response) => {
        setStudentDetails(response?.data[0]);
        // console.log(studentDetails);
      });
  }, [studentDetails, params.studentId, params.lectureId]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    status: Joi.string().min(4).max(7).required(),
    attendanceDate: Joi.string().required(),
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);
    return !!result.error;
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid item xs={10} sm={10} md={5} lg={5} xl={3} mt={15}>
        <Card>
          <Typography
            marginTop={2}
            variant="h6"
            color="#b71c1c"
            textAlign="center"
          >
            MANUAL ATTENDANCE
          </Typography>

          <CardContent>
            <Grid container spacing={2} textAlign="center" margin={2}>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Typography variant="body1">
                  <strong> Student Name: </strong>
                  {studentDetails?.[5]} {studentDetails?.[7]}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={8} sm={8} md={6} lg={6} xl={6} mt={2} mb={6}>
                <TextField
                  name="attendanceDate"
                  error={!!errors.attendanceDate}
                  helpertext={errors.attendanceDate}
                  value={form.attendanceDate}
                  onChange={handleChange}
                  label="Attendance Date"
                  variant="standard"
                  fullWidth
                />
                <TextField
                  name="status"
                  error={!!errors.status}
                  helpertext={errors.status}
                  value={form.status}
                  onChange={handleChange}
                  label="Status"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isFormInvalid()}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                navigate(
                  `/professor/dashboard/checkAttendance/${params.studentId}/${params.lectureId}`
                );
              }}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ManualAttendanceForm;
