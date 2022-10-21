import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as adminService from "../../../services/admin/DegreeService";
import { AdminContext } from "../../../context/admin/account/adminContext";
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";

const DegreeForm = ({ initialValue, degreeId }) => {
  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
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
      sx={{ marginTop: "100px" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (adminContext.isEdit) {
          adminService.editDegree(degreeId, degreeForm).then((res) => {
            console.log(res);
            onOpenSnackbar({
              open: true,
              severity: "success",
              message: "Successfully edited a Degree",
            });
          });
          adminContext.onSetIsEdit(false);
        } else {
          adminService.addDegree(degreeForm).then((res) => {
            console.log(res);
            onOpenSnackbar({
              open: true,
              severity: "success",
              message: "Successfully added a Degree",
            });
          });
        }
        navigate("/admin/degree-list");
      }}
    >
      <Grid item xs={10} sm={4} md={4} xl={3}>
        <Card>
          <CardHeader title="Add Degree Form" />

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
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit" fullWidth>
              SUBMIT
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DegreeForm;
