import React, { useEffect, useContext } from "react";
import TimeslotListTable from "../../components/admin/timeslot/TimeslotListTable";
import * as adminService from "../../services/admin/TimeslotService";
import { AdminContext } from "../../context/admin/account/adminContext";

const TimeslotListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    adminService
      .getTimeslot()
      .then((res) => adminContext.onSetTimeslotList(res.data));
  });
  return <TimeslotListTable details={adminContext.timeslotList} />;
};

export default TimeslotListPage;
