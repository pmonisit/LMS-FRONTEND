import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as adminService from "../../services/admin/AccountService";
import { AdminContext } from "../../context/admin/account/adminContext";
import LectureFormHolder from "../../components/admin/lecture/LectureFormHolder";

const EditLecturePage = () => {
  const adminContext = useContext(AdminContext);
  const params = useParams();

  const { lectureId, ...lecture } = adminContext.lectureList.find(
    (data) => data.lectureId === +params.id
  );

  const lectureClone = { ...lecture };
  Object.keys(lecture).forEach((key) => {
    if (lecture[key] === null || lecture[key] === "undefined") {
      lectureClone[key] = "";
    }
  });

  // const [lecture, setLecture] = useState([]);
  //let tempLecture;
  // useEffect(() => {
  //   const findLecture = async () => {};
  //   tempLecture = adminContext.lectureList.find(
  //     (data) => data[0] === +params.id
  //   );
  //   console.log(tempLecture);
  //   setLecture(tempLecture);
  // }, []);

  // console.log(lecture);
  // const lectureObject = {
  //   section: lecture[11],
  //   courseId: lecture[1],
  //   accountId: lecture[6],
  //   semesterId: lecture[19],
  //   dayOne: lecture[12],
  //   dayTwo: lecture[13],
  //   startTime: lecture[14],
  //   endTime: lecture[15],
  //   capacity: lecture[16],
  //   desired: lecture[17],
  // };
  // const lectureObject = {
  //   section: "",
  //   courseId: "",
  //   accountId: "",
  //   semesterId: "",
  //   dayOne: "",
  //   dayTwo: "",
  //   startTime: "",
  //   endTime: "",
  //   capacity: "",
  //   desired: "",
  // };

  //console.log(lectureObject);
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
      <LectureFormHolder initialValue={lectureClone} lectureId={lectureId} />
    </>
  );
};

export default EditLecturePage;
