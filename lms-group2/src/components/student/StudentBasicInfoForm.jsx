// React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Material Components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

// Service
import * as accountService from "../../services/shared/accounts";

// JOI
import Joi from "joi";

const StudentBasicInfoForm = ({ onSubmit, initialValue }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUserInfo(response.data[0]);
    });
  }, [userInfo]);

  const [form, setForm] = useState(
    initialValue || {
      firstName: "",
      middleName: "",
      lastName: "",
      degreeName: "",
      gender: "",
      birthdate: "",
    }
  );

  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    middleName: Joi.string().min(0).optional(),
    lastName: Joi.string().min(2).max(50).required(),
    degreeName: Joi.string().min(2).max(50).required(),
    gender: Joi.string().min(1).max(1).required(),
    birthdate: Joi.string().min(1).max(10).required(),
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
      <Grid item xs={10} sm={10} md={6} lg={4} xl={4} mt={15}>
        <Card>
          <CardHeader title="Edit Basic Information" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  error={!!errors.firstName}
                  helpertext={errors.firstName}
                  value={form.firstName}
                  onChange={handleChange}
                  label="First Name"
                  variant="standard"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="middleName"
                  error={!!errors.middleName}
                  helpertext={errors.middleName}
                  value={form.middleName}
                  onChange={handleChange}
                  label=" Middle Name"
                  variant="standard"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  value={form.lastName}
                  onChange={handleChange}
                  label=" Last Name"
                  variant="standard"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="degreeName"
                  error={!!errors.degreeName}
                  helperText={errors.degreeName}
                  value={form.degreeName}
                  onChange={handleChange}
                  label=" Degree Name"
                  variant="standard"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="gender"
                  error={!!errors.gender}
                  helperText={errors.gender}
                  value={form.gender}
                  onChange={handleChange}
                  label="Gender"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="date"
                  name="birthdate"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.birthdate}
                  helperText={errors.birthdate}
                  value={form.birthdate}
                  onChange={handleChange}
                  label="Birth Date"
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
                navigate(`/student/dashboard`);
              }}
            >
              Back
            </Button>
          </CardActions>
        </Card>
        <div>
          <sub>
            <font color="#d32f2f">
              <i>
                *Please coordinate personally with the registrar regarding
                change in name and degree
              </i>
            </font>
          </sub>
        </div>
      </Grid>
    </Grid>
  );
};

export default StudentBasicInfoForm;
