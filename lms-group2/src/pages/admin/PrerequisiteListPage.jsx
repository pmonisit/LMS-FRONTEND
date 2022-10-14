import React, { useContext, useEffect } from "react";
import SemesterListTable from "../../components/admin/semester/SemesterListTable";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as prerequisiteService from "../../services/admin/Prerequisite";
import PrerequisiteListTable from "../../components/admin/prerequisite/PrerequisiteListTable";

const PrerequisiteListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    prerequisiteService.getPrerequisite().then((res) => {
      console.log(res.data);
      adminContext.onSetPrerequisiteList(res.data);
    });
  }, []);
  return (
    <>
      <PrerequisiteListTable details={adminContext.prerequisiteList} />
    </>
  );
};

export default PrerequisiteListPage;
