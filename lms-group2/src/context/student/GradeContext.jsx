import { createContext, useState, useEffect } from "react";
import * as semesterService from "../../services/admin/Semester";

export const GradeContext = createContext({
  gradeColumns: [],
  mySemestersWithGrades: [],
});

export const GradeProvider = ({ children }) => {
  const [mySemestersWithGrades, setMySemestersWithGrades] = useState([]);

  useEffect(() => {
    semesterService.getMySemestersWithGrades().then((response) => {
      console.log(response.data);
      setMySemestersWithGrades(response.data);
    });
  }, []);

  const gradeColumns = [
    { id: "courseCode", label: "Course Code", minWidth: 100 },
    { id: "courseName", label: "Course Name", minWidth: 100 },
    { id: "section", label: "Section", minWidth: 100 },
    { id: "instructor", label: "Instructor", minWidth: 100 },
    { id: "units", label: "Units", minWidth: 100 },
    { id: "grade", label: "Grade", minWidth: 100 },
    { id: "remark", label: "Remarks", minWidth: 100 },
  ];

  const renderGrades = (lectureId, courseCode) => {};

  return (
    <GradeContext.Provider
      value={{
        gradeColumns: gradeColumns,
        mySemestersWithGrades: mySemestersWithGrades,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
