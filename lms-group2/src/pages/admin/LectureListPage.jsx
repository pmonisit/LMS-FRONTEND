import React, { useContext, useEffect } from "react";
import DegreeListTable2 from "../../components/admin/degree/DegreeListTable2";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as lectureService from "../../services/professor/LectureService";
import LectureListTable from "../../components/admin/lecture/LectureListTable";
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
      <LectureListTable details={adminContext.lectureList} />{" "}
    </>
  );
};

export default LectureListPage;
