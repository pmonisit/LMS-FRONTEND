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

const AccountForm = ({ accountForm, onSetAccountForm }) => {
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

  const handleChange = (event) => {
    onSetAccountForm({
      ...accountForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <Grid container justifyContent="center" sx={{ marginTop: "5vh" }}>
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardHeader title="Table" />

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
                <RoleSelection
                  role={role}
                  accountForm={accountForm}
                  onSetAccountForm={onSetAccountForm}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  onChange={handleChange}
                  value={firstName}
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
