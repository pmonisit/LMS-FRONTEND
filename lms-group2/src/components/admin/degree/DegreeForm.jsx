import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as adminService from "../../../services/admin/DegreeService";
import { AdminContext } from "../../../context/admin/account/adminContext";

const DegreeForm = ({ initialValue, degreeId }) => {
  useEffect(() => {
    console.log(initialValue);
    console.log(degreeId);
  });
  const adminContext = useContext(AdminContext);
  const [degreeForm, setDegreeForm] = useState(
    initialValue
      ? initialValue
      : {
          degreeCode: "",
          degreeName: "",
          unitsRequired: "",
        }
  );

  const { degreeCode, degreeName, unitsRequired } = degreeForm;

  const handleChange = (event) => {
    setDegreeForm({
      ...degreeForm,
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
        if (adminContext.isEdit) {
          adminService
            .editDegree(degreeId, degreeForm)
            .then((res) => console.log(res));
        } else {
          adminService.addDegree(degreeForm).then((res) => {
            console.log(res);
          });
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
                  name="degreeCode"
                  onChange={handleChange}
                  value={degreeCode}
                  label="Degree Code"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="degreeName"
                  onChange={handleChange}
                  value={degreeName}
                  label="Degree Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="unitsRequired"
                  onChange={handleChange}
                  value={unitsRequired}
                  label="Units Required"
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

export default DegreeForm;
