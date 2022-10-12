import { createContext, useState } from "react";

export const AdminContext = createContext({
  degreeList: [],
  onSetDegreeList: () => {},
  isEdit: false,
  onSetIsEdit: () => {},
  courseList: [],
  onSetCourseList: () => {},
  isEditCourse: false,
  onSetIsEditCourse: () => {},
  timeslotList: [],
  onSetTimeslotList: () => {},
  isTimeslotEdit: false,
  onSetIsTimeslotEdit: () => {},
  isEditSemester: false,
  onSetIsEditSemester: () => {},
  semesterList: [],
  onSetSemesterList: () => {},
});

export const AdminProvider = ({ children }) => {
  const [degreeList, setDegreeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [isEditCourse, setIsEditCourse] = useState(false);
  const [timeslotList, setTimeslotList] = useState([]);
  const [isTimeslotEdit, setIsTimeslotEdit] = useState(false);
  const [semesterList, setSemesterList] = useState([]);
  const [isEditSemester, setIsEditSemester] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        degreeList,
        onSetDegreeList: setDegreeList,
        isEdit,
        onSetIsEdit: setIsEdit,
        courseList,
        onSetCourseList: setCourseList,
        isEditCourse,
        onSetIsEditCourse: setIsEditCourse,
        timeslotList,
        onSetTimeslotList: setTimeslotList,
        isTimeslotEdit,
        onSetIsTimeslotEdit: setIsTimeslotEdit,
        isEditSemester,
        onSetIsEditSemester: setIsEditSemester,
        semesterList,
        onSetSemesterList: setSemesterList,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
