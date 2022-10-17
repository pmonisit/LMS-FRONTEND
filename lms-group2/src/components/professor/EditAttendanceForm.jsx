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

// Service
import * as attendanceService from "../../services/professor/AttendanceService";

// JOI
import Joi from "joi";
import { Typography } from "@mui/material";

const EditAttendanceForm = ({ onSubmit, initialValue }) => {
  const [attendanceDetails, setAttendanceDetails] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    attendanceService.getAttendanceById(params.id).then((response) => {
      //   console.log(response.data[0]);
      setAttendanceDetails(response.data[0]);
    });
  }, [attendanceDetails]);

  const [form, setForm] = useState(
    initialValue || {
      attendanceDate: "",
      status: "",
    }
  );

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    attendanceDate: Joi.string().min(4).max(10).required(),
    status: Joi.string().min(4).max(10).required(),
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
      <Grid item xs={10} sm={10} md={5} lg={3} xl={3} mt={15}>
        <Card>
          <Typography
            marginTop={2}
            variant="h6"
            color="#b71c1c"
            textAlign="center"
          >
            UPDATE ATTENDANCE
          </Typography>

          <CardContent>
            <Grid container spacing={2} textAlign="center" margin={2}>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Typography variant="body1">
                  <strong> Student Name: </strong>
                  {attendanceDetails[4]} {attendanceDetails[6]}
                </Typography>
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Typography variant="body1">
                  <strong> Attendance Date: </strong>
                  {attendanceDetails[1]}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
                  `/professor/dashboard/checkAttendance/${attendanceDetails[3]}`
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

export default EditAttendanceForm;
