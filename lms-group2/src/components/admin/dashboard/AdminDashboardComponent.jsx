import * as React from "react";

// Material Components
import Grid from "@mui/material/Grid";
import AdminCard from "./AdminCard";
import StudentCard from "./StudentCard";
import FacultyCard from "./FacultyCard";
import ParentCard from "./ParentCard";
import GraduateCard from "./GraduateCard";
import CoursesCard from "./CoursesCard";
import { Typography } from "@mui/material";

export default function MiniDrawer() {
  return (
    <>
      <Typography variant="h5" marginTop={5} textAlign="center" color="#b71c1c">
        ADMIN DASHBOARD
      </Typography>
      <Grid container marginTop={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} margin={5}>
          <AdminCard />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} margin={5}>
          <StudentCard />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} margin={5}>
          <FacultyCard />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} margin={5}>
          <ParentCard />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} margin={5}>
          <GraduateCard />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} margin={5}>
          <CoursesCard />
        </Grid>
      </Grid>
    </>
  );
}
