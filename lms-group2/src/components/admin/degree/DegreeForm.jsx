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
import Joi from "joi";
const DegreeForm = ({ initialValue, degreeId }) => {
  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const [errors, setErrors] = useState({});
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
    degreeCode: Joi.string().min(3).required(),
    degreeName: Joi.string().min(5).required(),
    unitsRequired: Joi.number().required(),
  });

  const isDegreeFormInvalid = () => {
    const result = schema.validate(degreeForm);
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
        if (adminContext.isEdit) {
          adminService
            .editDegree(degreeId, degreeForm)
            .then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a Degree",
              });
              adminContext.onSetIsEdit(false);
              navigate("/admin/degree-list");
            })
            .catch((error) => {
              if (error.response.status == 400) {
                onOpenSnackbar({
                  open: true,
                  severity: "error",
                  message: "Degree already exists",
                });
              }
            });
        } else {
          adminService
            .addDegree(degreeForm)
            .then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully added a Degree",
              });
              adminContext.onSetIsEdit(false);
              navigate("/admin/degree-list");
            })
            .catch((error) => {
              if (error.response.status == 400) {
                onOpenSnackbar({
                  open: true,
                  severity: "error",
                  message: "Degree already exists",
                });
              }
            });
        }
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
                  error={!!errors.degreeCode}
                  helperText={errors.degreeCode}
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
                  error={!!errors.degreeName}
                  helperText={errors.degreeName}
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
                  error={!!errors.unitsRequired}
                  helperText={errors.unitsRequired}
                  label="Units Required"
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
              disabled={isDegreeFormInvalid()}
            >
              SUBMIT
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DegreeForm;
