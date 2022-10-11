import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin/AccountService";
import { AdminContext } from "../../context/admin/account/adminContext";
import DegreeForm from "../../components/admin/degree/DegreeForm";

const EditDegreePage = () => {
  const params = useParams();

  const adminContext = useContext(AdminContext);
  const { degreeId, ...degree } = adminContext.degreeList.find(
    (data) => data.degreeId === +params.id
  );

  //   useEffect(() => {
  //     console.log("Hello");
  //     console.log(degree);
  //   }, []);
  const degreeClone = { ...degree };
  Object.keys(degree).forEach((key) => {
    if (degree[key] === null || degree[key] === "undefined") {
      degreeClone[key] = "";
    }
  });

  return (
    <>
      <DegreeForm initialValue={degreeClone} degreeId={degreeId} />{" "}
    </>
  );
};

export default EditDegreePage;
