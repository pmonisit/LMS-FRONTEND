import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import * as adminService from "../../services/admin/CourseService";
import CourseForm from "../../components/admin/course/CourseForm";
import { AdminContext } from "../../context/admin/account/adminContext";

const EditCoursePage = () => {
  const params = useParams();

  const adminContext = useContext(AdminContext);
  const { courseId, ...course } = adminContext.courseList.find(
    (data) => data.courseId === +params.id
  );

  const courseClone = { ...course };
  Object.keys(course).forEach((key) => {
    if (course[key] === null || course[key] === "undefined") {
      courseClone[key] = "";
    }
  });
  return (
    <>
      <CourseForm initialValue={courseClone} courseId={courseId} />
    </>
  );
};

export default EditCoursePage;
