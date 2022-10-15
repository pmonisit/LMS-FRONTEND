import React, { useContext, useEffect } from "react";
import SemesterListTable from "../../components/admin/semester/SemesterListTable";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/Semester";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
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
      <div style={{ marginTop: "80px" }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          LinkComponent={Link}
          to="/admin/add-semester"
        >
          Add Semester
        </Button>
        <SemesterListTable details={adminContext.semesterList} />
      </div>
    </>
  );
};

export default SemesterListPage;
