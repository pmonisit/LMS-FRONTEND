import { TableCell, TableRow } from "@mui/material";
import { createContext, useState, useEffect } from "react";
import * as semesterService from "../../services/admin/Semester";
import * as gradeService from "../../services/professor/GradeService";

export const GradeContext = createContext({
  gradeColumns: [],
  mySemestersWithGrades: [],
  renderGrades: () => {},
});

export const GradeProvider = ({ children }) => {
  const [mySemestersWithGrades, setMySemestersWithGrades] = useState([]);
  const [myGradesWithSem, setMyGradesWithSem] = useState([]);
  useEffect(() => {
    let myGradesWithSem = [];
    let id = 0;
    semesterService.getMySemestersWithGrades().then((response) => {
      setMySemestersWithGrades(response.data);
      response.data.map((resp) => {
        let semId = resp[0];
        let merge = [];
        gradeService.getMyGradesBySemId(semId).then((res) => {
          res.data.map((a) => {
            merge = [id++, ...resp, ...a];
            myGradesWithSem.push(merge);
            setMyGradesWithSem(myGradesWithSem);
          });
        });
      });
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

  const renderGrades = (semId) => {
    const sgrades = myGradesWithSem.filter((data) => data[1] === semId);

    return sgrades.map((data) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={data[0]}>
          <TableCell>{data[5]}</TableCell>
          <TableCell>{data[6]}</TableCell>
          <TableCell>{data[9]}</TableCell>
          <TableCell>
            {data[11]}, {data[10]}
          </TableCell>
          <TableCell>{data[12]}</TableCell>
          <TableCell>{data[7]}</TableCell>
          <TableCell>{data[8]}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <GradeContext.Provider
      value={{
        gradeColumns: gradeColumns,
        mySemestersWithGrades: mySemestersWithGrades,
        renderGrades: renderGrades,
      }}
    >
      {children}
    </GradeContext.Provider>
  );
};
