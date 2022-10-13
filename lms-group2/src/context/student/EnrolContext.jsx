import { createContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import * as accountService from "../../services/admin/AccountService";
import * as lectureService from "../../services/professor/LectureService";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";

export const EnrolContext = createContext({
  columns: [],
  user: [],
  lecturesBySem: [],
  renderEnrolActions: () => {},
});

export const EnrolProvider = ({ children }) => {
  const [enrolItems, setEnrolItems] = useState([]);
  const [user, setUser] = useState([]);
  const [lecturesBySem, setLecturesBySem] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);

  useEffect(() => {
    accountService.getCurrent().then((response) => {
      setUser(response.data[0]);
    });

    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);

      const semId = response.data.semesterId;
      let lecturesBySem = [];
      lectureService.getAllLecturesBySemID(semId).then((response) => {
        lecturesBySem.push(response.data);
        lecturesBySem.map((data) => {
          setLecturesBySem(data);
        });
      });
    });

    studentLoadService.getAllMyStudentLoads().then((response) => {
      console.log(response.data);
      setEnrolItems(response.data);
    });
  }, []);

  const columns = [
    { id: "courseCode", label: "Course Code", minWidth: 100 },
    { id: "courseName", label: "Course Name", minWidth: 100 },
    { id: "restriction", label: "Restriction", minWidth: 100 },
    { id: "units", label: "Units", minWidth: 100 },
    { id: "schedule", label: "Schedule", minWidth: 100 },
    { id: "section", label: "Section", minWidth: 100 },
    { id: "instructor", label: "Instructor", minWidth: 100 },
    { id: "slots", label: "Slots", minWidth: 100 },
    { id: "demand", label: "Demand", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];
  const handleEnrol = (lectureId) => {
    // const enrolItem = enrolItems.find(
    //   (enrolItem) => enrolItem.course.courseId === course.courseId
    // );
    // if (enrolItem) {
    //   setEnrolItems(
    //     enrolItems.map((enrolItem) => {
    //       console.log(enrolItem);
    //       return enrolItem;
    //     })
    //   );
    // } else {
    //   setEnrolItems([...enrolItems, { course }]);
    studentLoadService.addStudentLoad(lectureId);
    // }
  };

  const handleUnEnrol = (sloadId) => {
    console.log(sloadId);
    // const enrolItem = enrolItems.find(
    //   (enrolItem) => enrolItem[1] === course.courseId
    // );
    // setEnrolItems(
    //   enrolItems.filter(
    //     (enrolItem) => enrolItem.course.courseId !== course.courseId
    //   )
    // );
    studentLoadService.deleteStudentLoad(sloadId);
  };

  const renderEnrolActions = (lectureId) => {
    const enrolItem = [];

    enrolItems.map((data) => {
      enrolItem.splice(
        0,
        1,
        enrolItems.find((enrolItem) => enrolItem[1] === lectureId)
      );
    });

    if (enrolItem[0]) {
      return (
        <Button
          onClick={() => handleUnEnrol(enrolItem[0][0])}
          variant="contained"
          color="primary"
        >
          UNENROL
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEnrol(lectureId)}
        >
          ENROL
        </Button>
      );
    }
  };

  return (
    <EnrolContext.Provider
      value={{
        columns: columns,
        user: user,
        lecturesBySem: lecturesBySem,
        renderEnrolActions: renderEnrolActions,
      }}
    >
      {children}
    </EnrolContext.Provider>
  );
};
