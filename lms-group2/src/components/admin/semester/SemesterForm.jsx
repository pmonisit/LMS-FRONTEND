import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as adminService from "../../../services/admin/Semester";
import { AdminContext } from "../../../context/admin/account/adminContext";
import StartDatePicker from "./StartDatePicker";
import IsCurrentRadioButton from "./IsCurrentRadioButton";
import StartYearSelection from "./StartYearSelection";
import EndYearSelection from "./EndYearSelection";
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";

const SemesterForm = ({ initialValue, semesterId }) => {
  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const adminContext = useContext(AdminContext);
  const [semesterForm, setSemesterForm] = useState(
    initialValue
      ? initialValue
      : {
          startDate: "",
          isCurrent: "",
          startingYear: "",
          endingYear: "",
          semOrder: "",
        }
  );
  const { startDate, isCurrent, startingYear, endingYear, semOrder } =
    semesterForm;

  const handleChange = (event) => {
    setSemesterForm({
      ...semesterForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: "15vh", marginBottom: "15vh" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(semesterForm);
        if (adminContext.isEditSemester) {
          console.log("Edit");
          console.log(semesterForm);
          adminService
            .editSemester(semesterId, semesterForm)
            .then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a Semester",
              });
              adminContext.onSetIsEditSemester(false);
              navigate("/admin/semester-list");
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
          console.log("Add");
          adminService
            .addSemester(semesterForm)
            .then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully added a Semester",
              });
              adminContext.onSetIsEditSemester(false);
              navigate("/admin/semester-list");
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
          <CardHeader title="Create Semester" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <TextField
                  name="startDate"
                  onChange={handleChange}
                  value={startDate}
                  label="Start Date"
                  variant="standard"
                  fullWidth
                /> */}
                <StartDatePicker
                  semesterForm={semesterForm}
                  onSetSemesterForm={setSemesterForm}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="isCurrent"
                  onChange={handleChange}
                  value={isCurrent}
                  label="Is Current(Temporary Name)"
                  variant="standard"
                  fullWidth
                /> */}
                <IsCurrentRadioButton
                  semesterForm={semesterForm}
                  onSetSemesterForm={setSemesterForm}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="startingYear"
                  onChange={handleChange}
                  value={startingYear}
                  label="Starting Year"
                  variant="standard"
                  fullWidth
                /> */}
                <StartYearSelection
                  form={semesterForm}
                  onSetForm={setSemesterForm}
                  label="Starting Year"
                  value={startingYear}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="endingYear"
                  onChange={handleChange}
                  value={endingYear}
                  label="Ending Year"
                  variant="standard"
                  fullWidth
                /> */}
                <EndYearSelection
                  form={semesterForm}
                  onSetForm={setSemesterForm}
                  label="Ending Year"
                  value={endingYear}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="semOrder"
                  onChange={handleChange}
                  value={semOrder}
                  label="Semester Order"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SemesterForm;
