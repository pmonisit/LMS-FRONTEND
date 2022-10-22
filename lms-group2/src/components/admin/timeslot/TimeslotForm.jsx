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
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
const TimeslotForm = ({ initialValue, timeslotId }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
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
    timeslotCode: Joi.string().min(3).required(),
    yearNo: Joi.number().min(1).max(1).required(),
    semNo: Joi.number().min(1).max(1).required(),
  });

  const isTimeslotFormInvalid = () => {
    const result = schema.validate(timeslotForm);
    return !!result.error;
  };
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: "15vh" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(timeslotForm);
        if (adminContext.isTimeslotEdit) {
          adminService
            .editTimeslot(timeslotId, timeslotForm)
            .then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a Timeslot",
              });
              adminContext.onSetIsEdit(false);
              navigate("/admin/timeslot-list");
            })
            .catch((error) => {
              if (error.response.status == 400) {
                onOpenSnackbar({
                  open: true,
                  severity: "error",
                  message:
                    "Please use 1 digit for Year Number and Semester Number",
                });
              }
            });
        } else {
          adminService
            .addTimeslot(timeslotForm)
            .then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully added a Timeslot",
              });
              adminContext.onSetIsEdit(false);
              navigate("/admin/timeslot-list");
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
      <Grid item xs={10} md={4} sm={6}>
        <Card>
          <CardHeader title="Create Timeslot" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="timeslotCode"
                  onChange={handleChange}
                  value={timeslotCode}
                  error={!!errors.timeslotCode}
                  helperText={errors.timeslotCode}
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
                  error={!!errors.yearNo}
                  helperText={errors.yearNo}
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
                  error={!!errors.semNo}
                  helperText={errors.semNo}
                  label="Semester Number"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isTimeslotFormInvalid()}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TimeslotForm;
