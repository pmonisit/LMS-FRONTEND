import React, { useContext, useEffect } from "react";
import SemesterListTable from "../../components/admin/semester/SemesterListTable";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/Semester";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Box, Fab, Grid, Typography } from "@mui/material";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";

const SemesterListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    adminService.getSemester().then((res) => {
      adminContext.onSetSemesterList(res.data);
    });
  }, []);
  return (
    <>
      <Grid container mt={7}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box display={{ xs: "none", md: "block" }}>
            <AdminSidebar />
          </Box>
          <Box display={{ sm: "none" }}>
            <LinkMenu />
          </Box>
        </Grid>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          lg={8}
          xl={8}
          margin={2}
          marginBottom={10}
        >
          <Grid item xs={12} lg={12} marginBottom={5}>
            <Typography
              textAlign="center"
              color="#b71c1c"
              variant="h5"
              marginTop={4}
            >
              SEMESTER
            </Typography>
          </Grid>

          <Grid container justifyContent="end" spacing={2} marginBottom={2}>
            <Fab color="primary" LinkComponent={Link} to="/admin/add-semester">
              <AddIcon />
            </Fab>
          </Grid>

          <SemesterListTable details={adminContext.semesterList} />
        </Grid>
      </Grid>
    </>
  );
};

export default SemesterListPage;
