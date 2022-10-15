import React, { useContext, useEffect } from "react";

import { AdminContext } from "../../context/admin/account/adminContext";
import * as lectureService from "../../services/professor/LectureService";
import LectureListTable from "../../components/admin/lecture/LectureListTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
const LectureListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    lectureService.getLecture().then((res) => {
      console.log(res.data);
      adminContext.onSetLectureList(res.data);
    });
  }, []);
  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          LinkComponent={Link}
          to="/admin/add-lecture"
        >
          Add Lecture
        </Button>
        <LectureListTable details={adminContext.lectureList} />
      </div>
    </>
  );
};

export default LectureListPage;
