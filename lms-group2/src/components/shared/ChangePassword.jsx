// React
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Material Component
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as accountService from "../../services/shared/accounts";

// JOI
import Joi from "joi";

const ChangePassword = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [errors, setErrors] = useState({});
  const { onOpenSnackbar } = useContext(UserInterfaceContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUserInfo(response.data[0]);
    });
  }, [userInfo]);

  const schema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmNewPassword: Joi.string().required(),
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

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      if (form.newPassword !== form.confirmNewPassword) {
        onOpenSnackbar({
          open: true,
          severity: "error",
          message: "New password and confirm new password should be the same",
        });
      } else {
        await accountService.changePassword(form);
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: "Your password has been changed successfully",
        });
        if (userInfo[1] === "admin") {
          navigate(`/admin/admin-list`);
        } else if (userInfo[1] === "professor") {
          navigate(`/professor/dashboard/${userInfo[0]}`);
        } else if (userInfo[1] === "student") {
          navigate(`/dashboard`);
        } else {
          navigate(`/`);
        }
      }
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Old password is incorrect",
      });
    }
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
      marginTop={4}
      onSubmit={handleChangePassword}
    >
      <Grid item xs={10} sm={10} md={6} lg={4} xl={4} mt={15}>
        <Card>
          <CardHeader title="Change your password" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="oldPassword"
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword}
                  value={form.oldPassword}
                  onChange={handleChange}
                  label="Old Password"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                  label="New Password"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmNewPassword"
                  value={form.confirmNewPassword}
                  onChange={handleChange}
                  error={!!errors.confirmNewPassword}
                  helperText={errors.confirmNewPassword}
                  label="Confirm New Password"
                  type="password"
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
                if (userInfo[1] === "admin") {
                  navigate(`/admin/admin-list`);
                } else if (userInfo[1] === "professor") {
                  navigate(`/professor/dashboard/${userInfo[0]}`);
                } else if (userInfo[1] === "student") {
                  navigate(`/dashboard`);
                } else {
                  navigate(`/`);
                }
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
export default ChangePassword;
