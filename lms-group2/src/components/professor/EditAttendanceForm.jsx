// React
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Moment from "moment";

// Material Components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Service
import * as attendanceService from "../../services/professor/AttendanceService";

// JOI
import Joi from "joi";
import { Typography } from "@mui/material";

const EditAttendanceForm = ({ onSubmit }) => {
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [form, setForm] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    attendanceService.getAttendanceById(params.id).then((response) => {
      setAttendanceDetails(response.data[0]);
      // console.log(attendanceDetails);
    });
  }, [attendanceDetails]);

  const handleChange = (event) => {
    console.log(event.target.name);
    // setForm({ ...form, [event.target.name]: event.target.value });
    setForm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    onSubmit(form);
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
    >
      <Grid item xs={10} sm={10} md={5} lg={5} xl={4} mt={15}>
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
                  {Moment(attendanceDetails[1]).format("MMMM DD, YYYY")}
                </Typography>
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                <Typography variant="body1">
                  <strong> Current Status: </strong>
                  {attendanceDetails[2]}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}></Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} marginBottom={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="form"
                    id="form"
                    value={form}
                    label="Status"
                    onChange={handleChange}
                  >
                    <MenuItem></MenuItem>
                    <MenuItem value={"PRESENT"}>PRESENT</MenuItem>
                    <MenuItem value={"LATE"}>LATE</MenuItem>
                    <MenuItem value={"ABSENT"}>ABSENT</MenuItem>
                  </Select>
                </FormControl>

                {/* <TextField
                  name="status"
                  error={!!errors.status}
                  helpertext={errors.status}
                  value={form}
                  onChange={handleChange}
                  label="Status"
                  variant="standard"
                  fullWidth
                /> */}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit" fullWidth>
              Save
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                navigate(
                  `/professor/dashboard/checkAttendance/${attendanceDetails[3]}/${attendanceDetails[7]}`
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
