import React, { useContext, useEffect } from "react";
import SemesterListTable from "../../components/admin/semester/SemesterListTable";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as prerequisiteService from "../../services/admin/Prerequisite";
import PrerequisiteListTable from "../../components/admin/prerequisite/PrerequisiteListTable";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";
const PrerequisiteListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    prerequisiteService.getPrerequisite().then((res) => {
      adminContext.onSetPrerequisiteList(res.data);
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
              PRE-REQUISITE
            </Typography>
          </Grid>
          <PrerequisiteListTable details={adminContext.prerequisiteList} />
        </Grid>
      </Grid>
    </>
  );
};

export default PrerequisiteListPage;
