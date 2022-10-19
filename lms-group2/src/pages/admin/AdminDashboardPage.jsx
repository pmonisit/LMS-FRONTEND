import React from "react";

// Material Components
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Components
import AdminDashboardComponent from "../../components/admin/dashboard/AdminDashboardComponent";
import { Box } from "@mui/material";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";

const AdminDashboardPage = () => {
  return (
    <>
      <Typography textAlign="center" color="#b71c1c" variant="h6" marginTop={4}>
        ADMIN DASHBOARD
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
          <Box display={{ xs: "none", md: "block" }}>
            <AdminSidebar />
          </Box>
          <Box display={{ xl: "none" }}>
            <LinkMenu />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
          <AdminDashboardComponent />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminDashboardPage;
