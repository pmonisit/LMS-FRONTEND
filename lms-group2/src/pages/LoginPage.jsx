// React
import React, { useState } from "react";

// Material Component
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

// JOI
import Joi from "joi";

// Sweet Alert
import Swal from "sweetalert2";

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [visibilityPassword, setVisibilityPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const handleClickShowPassword = () => {
    setVisibilityPassword(!visibilityPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    console.log(form);
    onLogin(form.username, form.password);
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
      onSubmit={handleSubmit}
    >
      <Grid item xs={10} sm={10} md={6} lg={4} xl={4} mt={15}>
        <Card>
          <CardHeader title="LOGIN" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  error={!!errors.username}
                  helperText={errors.username}
                  value={form.username}
                  onChange={handleChange}
                  label="Username"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={form.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  label="Password"
                  name="password"
                  type={visibilityPassword ? "text" : "password"}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {visibilityPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
              Login
            </Button>
          </CardActions>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            mb={1}
          >
            <Grid item xs={12}>
              <FormLabel>Don't have an account? </FormLabel>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  Swal.fire("Admin Hotline: 9867-4583");
                }}
              >
                Contact administrator
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
