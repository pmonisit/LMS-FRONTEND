import React, { useEffect, useContext } from "react";

import TimeslotListTable from "../../components/admin/timeslot/TimeslotListTable";
import * as adminService from "../../services/admin/TimeslotService";
import { AdminContext } from "../../context/admin/account/adminContext";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Fab, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";
const TimeslotListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    adminService
      .getTimeslot()
      .then((res) => adminContext.onSetTimeslotList(res.data));
  });
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
              TIMESLOT
            </Typography>
          </Grid>
          <Grid container justifyContent="end" spacing={2} marginBottom={2}>
            <Fab color="primary" LinkComponent={Link} to="/admin/add-timeslot">
              <AddIcon />
            </Fab>
          </Grid>
          <TimeslotListTable details={adminContext.timeslotList} />;
        </Grid>
      </Grid>
    </>
  );
};

export default TimeslotListPage;
