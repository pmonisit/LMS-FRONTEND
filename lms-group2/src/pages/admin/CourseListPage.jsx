import React, { useContext, useEffect } from "react";

import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/CourseService";
import CourseListTable from "../../components/admin/course/CourseListTable";

const CourseListPage = () => {
  const adminContext = useContext(AdminContext);
  useEffect(() => {
    adminService.getCourse().then((res) => {
      adminContext.onSetCourseList(res.data);
    });
  });
  return (
    <>
      <CourseListTable details={adminContext.courseList} />
    </>
  );
};

export default CourseListPage;
