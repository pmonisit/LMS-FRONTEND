import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MultiStepper from "./MultiStepper";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import BasicDatePicker from "./BasicDatePicker";
import { EventAvailableSharp } from "@mui/icons-material";
import Selection from "./Selection";
import { getStudents } from "../../../services/admin/AccountService";
import * as degreeService from "../../../services/admin/DegreeService";
import GenderRadioButton from "./GenderRadioButton";
import ActiveRadioButton from "./ActiveRadioButton";
import DegreeSelection from "./DegreeSelection";

const AccountForm2 = ({ accountForm, onSetAccountForm }) => {
  const accountFormContext = useContext(AccountFormContext);
  // const { gender, birthdate, status, active, childId, degreeId } =
  //   accountFormContext.accountForm;
  const [students, setStudents] = useState([]);
  const [degrees, setDegrees] = useState([]);
  useEffect(() => {
    getStudents().then((res) => setStudents(res.data));
    degreeService.getDegree().then((res) => setDegrees(res.data));
  }, []);
  const {
    role,
    firstName,
    middleName,
    lastName,
    gender,
    birthdate,

    active,
    username,
    password,
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
                {/* <TextField
                  name="gender"
                  onChange={handleChange}
                  value={gender}
                  label="Gender"
                  variant="standard"
                  fullWidth
                /> */}
                <GenderRadioButton
                  accountForm={accountForm}
                  onSetAccountForm={onSetAccountForm}
                />
              </Grid>

              <Grid item xs={12}>
                {/* <TextField
                  name="active"
                  onChange={handleChange}
                  value={active}
                  label="Active"
                  variant="standard"
                  fullWidth
                /> */}
                <ActiveRadioButton
                  accountForm={accountForm}
                  onSetAccountForm={onSetAccountForm}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  name="birthdate"
                  onChange={handleChange}
                  value={birthdate}
                  label="Birthdate"
                  variant="standard"
                  fullWidth
                /> */}
                <BasicDatePicker
                  accountForm={accountForm}
                  onSetAccountForm={onSetAccountForm}
                />
              </Grid>
              {role === "parent" && (
                <Grid item xs={12}>
                  {/* <TextField
                    name="childId"
                    onChange={handleChange}
                    value={childId}
                    label="Child Id"
                    variant="standard"
                    fullWidth
                  /> */}
                  <Selection
                    id={childId}
                    list={students}
                    accountForm={accountForm}
                    onSetAccountForm={onSetAccountForm}
                    label="Child Name"
                  />
                </Grid>
              )}

              {role === "student" && (
                <Grid item xs={12}>
                  {/* <TextField
                    name="degreeId"
                    onChange={handleChange}
                    value={degreeId}
                    label="DegreeId"
                    variant="standard"
                    fullWidth
                  /> */}
                  <DegreeSelection
                    list={degrees}
                    form={accountForm}
                    onSetForm={onSetAccountForm}
                    id={degreeId}
                    label="Degree"
                  />
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AccountForm2;
