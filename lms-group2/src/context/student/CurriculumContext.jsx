import { createContext, useState, useEffect } from "react";
import * as accountService from "../../services/admin/AccountService";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as degreeService from "../../services/admin/DegreeService";

export const CurriculumContext = createContext({
  degree: [],
  handleCurriculum: () => {},
  handleConvert: () => {},
  handleSumOfUnits: () => {},
});

export const CurriculumProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);
  const [degree, setDegree] = useState([]);

  useEffect(() => {
    accountService.getCurrent().then((response) => {
      setUser(response.data[0]);
      let degreeId = response.data[0][10];
      degreeService.getDegreeById(degreeId).then((degree) => {
        setDegree(degree.data);
      });
    });
    courseAssignedService.getMyCourses().then((response) => {
      setMyCoursesAssigned(response.data);
    });
  }, []);

  const handleCurriculum = () => {
    const curriculum = myCoursesAssigned;
    let groupByYear = curriculum.reduce((groupNow, a) => {
      (groupNow[a[7]] = groupNow[a[7]] || []).push(a);
      return groupNow;
    }, []);
    groupByYear = groupByYear.slice(1);
    let sortedCurriculum = [];
    groupByYear.map((data) => {
      sortedCurriculum.push(
        data.sort((a, b) => {
          return a[8].localeCompare(b[8]);
        })
      );
    });

    let curriculumSem = groupByYear.map((data) => {
      return data.reduce((groupNow, a) => {
        (groupNow[a[8]] = groupNow[a[8]] || []).push(a);
        return groupNow;
      }, []);
    });

    let curriculumSemWithoutEmpty = [];
    curriculumSem.map((data) => {
      data.map((a) => {
        curriculumSemWithoutEmpty.push(a);
      });
    });
    return curriculumSemWithoutEmpty;
  };

  const handleSumOfUnits = (year, sem) => {
    let sum = 0;
    myCoursesAssigned
      .filter((course) => course[7] === year && course[8] === sem)
      .map((course) => {
        sum = sum + course[2];
      });
    return sum;
  };

  const handleConvert = (number) => {
    let yearLevel = "";
    switch (number) {
      case "1":
        yearLevel = "FIRST";
        break;
      case "2":
        yearLevel = "SECOND";
        break;
      case "3":
        yearLevel = "THIRD";
        break;
      case "4":
        yearLevel = "FOURTH";
        break;
      case "5":
        yearLevel = "FIFTH";
        break;
      default:
        yearLevel = "NUMBER";
    }

    return yearLevel;
  };
  return (
    <CurriculumContext.Provider
      value={{
        degree: degree,
        handleCurriculum: handleCurriculum,
        handleConvert: handleConvert,
        handleSumOfUnits: handleSumOfUnits,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};
