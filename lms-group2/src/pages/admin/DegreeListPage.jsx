import React, { useContext, useEffect } from "react";
import DegreeListTable2 from "../../components/admin/degree/DegreeListTable2";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/DegreeService";
const DegreeListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    adminService.getDegree().then((res) => {
      console.log(res.data);
      adminContext.onSetDegreeList(res.data);
      console.log(adminContext.degreeList);
    });
  }, []);
  return (
    <>
      <DegreeListTable2 details={adminContext.degreeList} />
    </>
  );
};

export default DegreeListPage;
