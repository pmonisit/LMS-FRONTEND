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

const StudentForm = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { studentId, studentNo, accountId, programId, semId, yearLevel } =
    accountFormContext.studentForm;
  const handleChange = (event) => {
    accountFormContext.onSetStudentForm({
      ...accountFormContext.studentForm,
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
                <TextField
                  name="studentId"
                  onChange={handleChange}
                  value={studentId}
                  label="Student ID"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="studentNo"
                  onChange={handleChange}
                  value={studentNo}
                  label="Student No"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="accountId"
                  onChange={handleChange}
                  value={accountId}
                  label="Account ID"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="programId"
                  onChange={handleChange}
                  value={programId}
                  label="Program ID"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="semId"
                  onChange={handleChange}
                  value={semId}
                  label="Semester ID"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="yearLevel"
                  onChange={handleChange}
                  value={yearLevel}
                  label="Semester ID"
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

export default StudentForm;
