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

const AccountForm2 = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { gender, birthdate, status, active } = accountFormContext.accountForm;

  const handleChange = (event) => {
    accountFormContext.onSetAccountForm({
      ...accountFormContext.accountForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Grid
      container
      justifyContent="center"
      //component="form"
      //onSubmit={handleSubmit}
      sx={{ marginTop: "5vh" }}
    >
      <Grid item xs={12} md={6} sm={6} lg={6}>
        <Card>
          <CardHeader title="Table" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="gender"
                  onChange={handleChange}
                  value={gender}
                  label="Gender"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="birthdate"
                  onChange={handleChange}
                  value={birthdate}
                  label="Birthdate"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="status"
                  onChange={handleChange}
                  value={status}
                  label="Status"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="active"
                  onChange={handleChange}
                  value={active}
                  label="Active"
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

export default AccountForm2;
