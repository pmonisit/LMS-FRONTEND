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

const ProfessorForm = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { professorNo, accounId } = accountFormContext.professorForm;
  const handleChange = (event) => {
    accountFormContext.onSetProfessorForm({
      ...accountFormContext.professorForm,
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
                name="professorNo"
                onChange={handleChange}
                value={professorNo}
                label="Professor Number"
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

export default ProfessorForm;
