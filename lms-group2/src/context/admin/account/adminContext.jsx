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
});

export const AdminProvider = ({ children }) => {
  const [degreeList, setDegreeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [isEditCourse, setIsEditCourse] = useState(false);

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
