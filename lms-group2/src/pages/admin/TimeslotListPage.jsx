import React, { useEffect, useContext } from "react";

import TimeslotListTable from "../../components/admin/timeslot/TimeslotListTable";
import * as adminService from "../../services/admin/TimeslotService";
import { AdminContext } from "../../context/admin/account/adminContext";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
const TimeslotListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    adminService
      .getTimeslot()
      .then((res) => adminContext.onSetTimeslotList(res.data));
  });
  return (
    <div style={{ marginTop: "80px" }}>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        LinkComponent={Link}
        to="/admin/add-timeslot"
      >
        Add Timeslot
      </Button>
      <TimeslotListTable details={adminContext.timeslotList} />;
    </div>
  );
};

export default TimeslotListPage;
