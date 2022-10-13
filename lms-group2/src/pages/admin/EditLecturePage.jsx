import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin/AccountService";
import { AdminContext } from "../../context/admin/account/adminContext";
import LectureFormHolder from "../../components/admin/lecture/LectureFormHolder";

const EditLecturePage = () => {
  const params = useParams();

  const adminContext = useContext(AdminContext);
  const { lectureId, ...lecture } = adminContext.lectureList.find(
    (data) => data.lectureId === +params.id
  );

  //   useEffect(() => {
  //     console.log("Hello");
  //     console.log(degree);
  //   }, []);
  const lectureClone = { ...lecture };
  Object.keys(lecture).forEach((key) => {
    if (lecture[key] === null || lecture[key] === "undefined") {
      lectureClone[key] = "";
    }
  });

  return (
    <>
      <LectureFormHolder initialValue={lectureClone} lectureId={lectureId} />
    </>
  );
};

export default EditLecturePage;
