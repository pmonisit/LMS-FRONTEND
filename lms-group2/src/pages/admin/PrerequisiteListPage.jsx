import React, { useContext, useEffect } from "react";
import SemesterListTable from "../../components/admin/semester/SemesterListTable";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as prerequisiteService from "../../services/admin/Prerequisite";
import PrerequisiteListTable from "../../components/admin/prerequisite/PrerequisiteListTable";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
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
      <div style={{ marginTop: "80px" }}>
        <PrerequisiteListTable details={adminContext.prerequisiteList} />
      </div>
    </>
  );
};

export default PrerequisiteListPage;
