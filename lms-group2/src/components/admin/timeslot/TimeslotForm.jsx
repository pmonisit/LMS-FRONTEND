import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as adminService from "../../../services/admin/TimeslotService";
import { AdminContext } from "../../../context/admin/account/adminContext";

const TimeslotForm = ({ initialValue, timeslotId }) => {
  const adminContext = useContext(AdminContext);
  const [timeslotForm, setTimeSlotForm] = useState(
    initialValue
      ? initialValue
      : {
          timeslotCode: "",
          yearNo: "",
          semNo: "",
        }
  );
  const { timeslotCode, yearNo, semNo } = timeslotForm;

  const handleChange = (event) => {
    setTimeSlotForm({
      ...timeslotForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: "5vh" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(timeslotForm);
        if (adminContext.isTimeslotEdit) {
          adminService
            .editTimeslot(timeslotId, timeslotForm)
            .then((res) => console.log(res));
        } else {
          adminService
            .addTimeslot(timeslotForm)
            .then((res) => console.log(res));
        }

        adminContext.onSetIsEdit(false);
      }}
    >
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardHeader title="Table" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="timeslotCode"
                  onChange={handleChange}
                  value={timeslotCode}
                  label="Timeslot Code"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="yearNo"
                  onChange={handleChange}
                  value={yearNo}
                  label="Year Number"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="semNo"
                  onChange={handleChange}
                  value={semNo}
                  label="Semester Number"
                  variant="standard"
                  fullWidth
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

export default TimeslotForm;
