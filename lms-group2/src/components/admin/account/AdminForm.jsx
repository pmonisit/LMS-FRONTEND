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

const AdminForm = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { adminNo, accounId } = accountFormContext.adminForm;
  const handleChange = (event) => {
    accountFormContext.onSetAdminForm({
      ...accountFormContext.adminForm,
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
                name="adminNo"
                onChange={handleChange}
                value={adminNo}
                label="Administrator Number"
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

export default AdminForm;
