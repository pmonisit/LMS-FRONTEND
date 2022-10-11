import { createContext, useState } from "react";
import Button from "@mui/material/Button";

export const EnrolContext = createContext({
  columns: [],
  renderEnrolActions: () => {},
});

export const EnrolProvider = ({ children }) => {
  const [enrolItems, setEnrolItems] = useState([]);

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
  const handleEnrol = (course) => {
    const enrolItem = enrolItems.find(
      (enrolItem) => enrolItem.course.courseId === course.courseId
    );
    if (enrolItem) {
      setEnrolItems(
        enrolItems.map((enrolItem) => {
          console.log(enrolItem);
          return enrolItem;
        })
      );
    } else {
      setEnrolItems([...enrolItems, { course }]);
    }
  };

  const handleUnEnrol = (course) => {
    const enrolItem = enrolItems.find(
      (enrolItem) => enrolItem.course.courseId === course.courseId
    );

    setEnrolItems(
      enrolItems.filter(
        (enrolItem) => enrolItem.course.courseId !== course.courseId
      )
    );
  };

  const renderEnrolActions = (course) => {
    const enrolItem = enrolItems.find(
      (enrolItem) => enrolItem.course.courseId === course.courseId
    );
    if (enrolItem) {
      return (
        <Button
          onClick={() => handleUnEnrol(course)}
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
          onClick={() => handleEnrol(course)}
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
        renderEnrolActions: renderEnrolActions,
      }}
    >
      {children}
    </EnrolContext.Provider>
  );
};
