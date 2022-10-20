// React
import React from "react";

// Material Components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Pages
import ProfessorScheduleComponent from "../../components/professor/ProfessorScheduleComponent";
import Profile from "../../components/shared/Profile";

const ProfessorDashboardPage = () => {
  return (
    <>
      <Typography textAlign="center" color="#b71c1c" variant="h6" marginTop={4}>
        FACULTY DASHBOARD
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={3} marginBottom={15}>
          <Profile />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={7.7} xl={9} marginBottom={15}>
          <ProfessorScheduleComponent />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessorDashboardPage;
