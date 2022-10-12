import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin/AccountService";
import { AdminContext } from "../../context/admin/account/adminContext";
import SemesterForm from "../../components/admin/semester/SemesterForm";

const EditSemesterPage = () => {
  const params = useParams();

  const adminContext = useContext(AdminContext);
  const { semesterId, ...semester } = adminContext.semesterList.find(
    (data) => data.semesterId === +params.id
  );

  //   useEffect(() => {
  //     console.log("Hello");
  //     console.log(degree);
  //   }, []);
  const semesterClone = { ...semester };
  Object.keys(semester).forEach((key) => {
    if (semester[key] === null || semester[key] === "undefined") {
      semesterClone[key] = "";
    }
  });

  return (
    <>
      <SemesterForm initialValue={semesterClone} semesterId={semesterId} />
    </>
  );
};

export default EditSemesterPage;
