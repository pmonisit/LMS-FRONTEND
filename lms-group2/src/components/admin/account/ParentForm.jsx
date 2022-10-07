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

const ParentForm = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { parentNo, accounId, studentId } = accountFormContext.parentForm;
  const handleChange = (event) => {
    accountFormContext.onSetParentForm({
      ...accountFormContext.parentForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Grid item xs={12} md={6} sm={6} lg={6}>
      <Card>
        <CardHeader title="Table" />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="parentNo"
                onChange={handleChange}
                value={parentNo}
                label="Parent Number"
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="studentId"
                onChange={handleChange}
                value={studentId}
                label="Student Name"
                variant="standard"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ParentForm;
