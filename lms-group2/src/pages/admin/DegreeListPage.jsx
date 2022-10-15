import React, { useContext, useEffect } from "react";
import DegreeListTable2 from "../../components/admin/degree/DegreeListTable2";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/DegreeService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
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
      <div style={{ marginTop: "80px" }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          LinkComponent={Link}
          to="/admin/add-degree"
        >
          Add Degree
        </Button>
        <DegreeListTable2 details={adminContext.degreeList} />
      </div>
    </>
  );
};

export default DegreeListPage;
