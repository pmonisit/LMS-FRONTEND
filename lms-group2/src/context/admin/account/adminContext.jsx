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
  isEditLecture: false,
  onSetIsEditLecture: () => {},
  lectureList: [],
  onSetLectureList: () => {},
  isEditPrerequisite: false,
  onSetIsEditPrerequisite: () => {},
  prerequisiteList: [],
  onSetPrerequisiteList: () => {},
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
  const [isEditLecture, setIsEditLecture] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [isEditPrerequisite, setIsEditPrerequisite] = useState(false);
  const [prerequisiteList, setPrerequisiteList] = useState([]);

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
        isEditLecture,
        onSetIsEditLecture: setIsEditLecture,
        lectureList,
        onSetLectureList: setLectureList,
        isEditPrerequisite,
        onSetIsEditPrerequisite: setIsEditPrerequisite,
        prerequisiteList,
        onSetPrerequisiteList: setPrerequisiteList,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
