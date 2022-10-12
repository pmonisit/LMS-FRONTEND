import React, { useContext, useEffect } from "react";
import SemesterListTable from "../../components/admin/semester/SemesterListTable";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/Semester";
const SemesterListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    adminService.getSemester().then((res) => {
      console.log(res.data);
      adminContext.onSetSemesterList(res.data);
    });
  }, []);
  return (
    <>
      <SemesterListTable details={adminContext.semesterList} />
    </>
  );
};

export default SemesterListPage;
