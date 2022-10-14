import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin/AccountService";
import { AdminContext } from "../../context/admin/account/adminContext";
import PrerequisiteForm2 from "../../components/admin/prerequisite/PrerequisiteForm2";

const EditPrerequisitePage = () => {
  const params = useParams();

  const adminContext = useContext(AdminContext);
  const { prerequisiteId, ...prerequisite } =
    adminContext.prerequisiteList.find(
      (data) => data.prerequisiteId === +params.id
    );

  //   useEffect(() => {
  //     console.log("Hello");
  //     console.log(degree);
  //   }, []);
  const prerequisiteClone = { ...prerequisite };
  Object.keys(prerequisite).forEach((key) => {
    if (prerequisite[key] === null || prerequisite[key] === "undefined") {
      prerequisiteClone[key] = "";
    }
  });

  return (
    <>
      <PrerequisiteForm2
        initialValue={prerequisiteClone}
        prerequisiteId={prerequisiteId}
      />
    </>
  );
};

export default EditPrerequisitePage;
