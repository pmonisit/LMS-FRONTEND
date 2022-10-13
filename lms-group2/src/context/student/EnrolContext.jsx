import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import * as accountService from "../../services/admin/AccountService";
import * as lectureService from "../../services/professor/LectureService";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";

export const EnrolContext = createContext({
  columns: [],
  coursesAssignedColumns: [],
  user: [],
  lecturesBySem: [],
  myRecommendedCoursesAssigned: [],
  searchTerm: [],
  myDesiredSLoads: [],
  renderEnrolActions: () => {},
  handleSearchForClass: () => {},
  handleTypeSearch: () => {},
  handleRemarks: () => {},
});

export const EnrolProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [lecturesBySem, setLecturesBySem] = useState([]);
  const [enrolItems, setEnrolItems] = useState([]);
  const [myEnrolledSLoads, setMyEnrolledSLoads] = useState([]);
  const [myDesiredSLoads, setMyDesiredSLoads] = useState([]);
  const [myRecommendedCoursesAssigned, setMyRecommendedCoursesAssigned] =
    useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

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
      setEnrolItems(response.data);
    });

    studentLoadService.getMyEnrolledStudentLoads().then((response) => {
      console.log(response.data);
      setMyEnrolledSLoads(response.data);
    });
    studentLoadService.getMyDesiredStudentLoads().then((response) => {
      console.log(response.data);
      setMyDesiredSLoads(response.data);
    });

    // courseAssignedService.getCourseAssigned().then((response) => {
    //   // setMyCoursesAssigned(response.data);
    // });
    // courseAssignedService.getMyCourses().then((response) => {
    //   // setMyCoursesAssigned(response.data);
    // });
    courseAssignedService.getMyRecommendedCourses().then((response) => {
      setMyRecommendedCoursesAssigned(response.data);
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

  const coursesAssignedColumns = [
    { id: "courseCode", label: "Course Code", minWidth: 100 },
    { id: "courseName", label: "Course Name", minWidth: 100 },
    { id: "units", label: "Units", minWidth: 100 },
    { id: "action", label: "Remarks/Action", minWidth: 100 },
  ];

  const handleEnrol = (lectureId) => {
    studentLoadService.addStudentLoad(lectureId);
  };

  const handleUnEnrol = (sloadId) => {
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

  const handleSearchForClass = (term) => {
    setSearchTerm(term);
    navigate("/courses");
  };

  const handleTypeSearch = () => {
    return (
      <div align="center">
        <input
          type="text"
          placeholder="Search Course..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
    );
  };

  const handleRemarks = (courseCode) => {
    const sl = [];
    sl.splice(
      0,
      1,
      myEnrolledSLoads.find((demo) => demo[2] === courseCode)
    );
    if (sl[0]) {
      return "ENROLLED";
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearchForClass(courseCode)}
        >
          SEARCH
        </Button>
      );
    }
  };
  return (
    <EnrolContext.Provider
      value={{
        columns: columns,
        coursesAssignedColumns: coursesAssignedColumns,
        user: user,
        lecturesBySem: lecturesBySem,
        myRecommendedCoursesAssigned: myRecommendedCoursesAssigned,
        searchTerm: searchTerm,
        myDesiredSLoads: myDesiredSLoads,
        renderEnrolActions: renderEnrolActions,
        handleSearchForClass: handleSearchForClass,
        handleTypeSearch: handleTypeSearch,
        handleRemarks: handleRemarks,
      }}
    >
      {children}
    </EnrolContext.Provider>
  );
};
