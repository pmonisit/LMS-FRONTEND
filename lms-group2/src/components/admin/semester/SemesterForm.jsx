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

const SemesterForm = ({ initialValue, semesterId }) => {
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
      sx={{ marginTop: "5vh" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(semesterForm);
        if (adminContext.isEditSemester) {
          console.log("Edit");
          console.log(semesterForm);
          adminService
            .editSemester(semesterId, semesterForm)
            .then((res) => console.log(res));
          adminContext.onSetIsEditSemester(false);
        } else {
          console.log("Add");
          adminService
            .addSemester(semesterForm)
            .then((res) => console.log(res));
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
                  name="startDate"
                  onChange={handleChange}
                  value={startDate}
                  label="Start Date"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="isCurrent"
                  onChange={handleChange}
                  value={isCurrent}
                  label="Is Current(Temporary Name)"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="startingYear"
                  onChange={handleChange}
                  value={startingYear}
                  label="Starting Year"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="endingYear"
                  onChange={handleChange}
                  value={endingYear}
                  label="Ending Year"
                  variant="standard"
                  fullWidth
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

            <CardActions>
              <Button type="submit">Submit</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SemesterForm;
