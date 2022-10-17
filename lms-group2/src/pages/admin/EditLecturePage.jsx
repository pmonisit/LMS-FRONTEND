import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin/AccountService";
import { AdminContext } from "../../context/admin/account/adminContext";
import LectureFormHolder from "../../components/admin/lecture/LectureFormHolder";

const EditLecturePage = () => {
  const params = useParams();

  const adminContext = useContext(AdminContext);
  const lecture = adminContext.lectureList.find(
    (data) => data[0] === +params.id
  );

  const lectureObject = {
    section: lecture[10],
    courseId: lecture[1],
    accountId: "",
    semesterId: "",
    dayOne: lecture[11],
    dayTwo: lecture[12],
    startTime: lecture[13],
    endTime: lecture[14],
    capacity: lecture[15],
    desired: lecture[16],
  };

  //   useEffect(() => {
  //     // console.log(adminContext.lectureList);
  //     const lecture = adminContext.lectureList.find(
  //       (data) => data[0] == params.id
  //     );
  //   }, []);
  //   const lectureClone = { ...lecture };
  //   Object.keys(lecture).forEach((key) => {
  //     if (lecture[key] === null || lecture[key] === "undefined") {
  //       lectureClone[key] = "";
  //     }
  //   });

  return (
    <>
      <LectureFormHolder initialValue={lectureObject} lectureId={lecture[0]} />
    </>
  );
};

export default EditLecturePage;
