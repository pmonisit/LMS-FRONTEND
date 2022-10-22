import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MultiStepper from "./MultiStepper";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import RoleSelection from "./RoleSelection";

const AccountForm = ({
  accountForm,
  onSetAccountForm,
  errors,
  onSetErrors,
  schema,
  handleChange,
}) => {
  const accountFormContext = useContext(AccountFormContext);
  // const { role, firstName, middleName, lastName, username, password } =
  //   accountFormContext.accountForm;

  const {
    role,
    firstName,
    middleName,
    lastName,
    gender,
    birthdate,
    status,
    active,
    username,

    childId,
    degreeId,
  } = accountForm;

  // const handleChange = (event) => {
  //   onSetAccountForm({
  //     ...accountForm,
  //     [event.currentTarget.name]: event.currentTarget.value,
  //   });

  //   const { error } = schema
  //     .extract(event.currentTarget.name)
  //     .label(event.currentTarget.name)
  //     .validate(event.currentTarget.value);
  //   if (error) {
  //     onSetErrors({
  //       ...errors,
  //       [event.currentTarget.name]: error.details[0].message,
  //     });
  //   } else {
  //     delete errors[event.currentTarget.name];
  //     onSetErrors(errors);
  //   }
  // };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={3} sm={3}>
        <Card>
          <CardHeader title="Personal Details" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <TextField
                  name="role"
                  onChange={handleChange}
                  value={role}
                  label="Role"
                  variant="standard"
                  fullWidth
                /> */}
                {/* <RoleSelection
                  role={role}
                  accountForm={accountForm}
                  onSetAccountForm={onSetAccountForm}
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  label="First Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="middleName"
                  onChange={handleChange}
                  value={middleName}
                  error={!!errors.middleName}
                  helperText={errors.middleName}
                  label="Middle Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  onChange={handleChange}
                  value={lastName}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  label="Last Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="username"
                  onChange={handleChange}
                  value={username}
                  error={!!errors.userName}
                  helperText={errors.userName}
                  label="Username"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AccountForm;
