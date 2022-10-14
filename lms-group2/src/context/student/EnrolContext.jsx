import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as accountService from "../../services/admin/AccountService";
import * as lectureService from "../../services/professor/LectureService";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";

export const EnrolContext = createContext({
  columns: [],
  coursesAssignedColumns: [],
  scheduleColumns: [],
  user: [],
  lecturesBySem: [],
  myRecommendedCoursesAssigned: [],
  searchTerm: [],
  myDesiredSLoads: [],
  currentSem: [],
  renderEnrolActions: () => {},
  handleSearchForClass: () => {},
  handleTypeSearch: () => {},
  handleRemarks: () => {},
  handleSchedule: () => {},
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
  const [myCoursesAssigned, setMyCoursesAssigned] = useState([]);
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
        console.log(semId);
        console.log(response);
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
      setMyEnrolledSLoads(response.data);
    });
    studentLoadService.getMyDesiredStudentLoads().then((response) => {
      setMyDesiredSLoads(response.data);
    });
    courseAssignedService.getMyCourses().then((response) => {
      setMyCoursesAssigned(response.data);
    });
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

  const scheduleColumns = [
    { id: "M", label: "Monday", minWidth: 100 },
    { id: "T", label: "Tuesday", minWidth: 100 },
    { id: "W", label: "Wednesday", minWidth: 100 },
    { id: "Th", label: "Thursday", minWidth: 100 },
    { id: "F", label: "Friday", minWidth: 100 },
    { id: "S", label: "Saturday", minWidth: 100 },
    { id: "Su", label: "Sunday", minWidth: 100 },
  ];

  const handleEnrol = (lectureId) => {
    studentLoadService.addStudentLoad(lectureId);
  };

  const handleUnEnrol = (sloadId) => {
    studentLoadService.deleteStudentLoad(sloadId);
  };

  const renderEnrolActions = (lectureId, courseCode) => {
    const enrolItem = [];
    const taken = myCoursesAssigned.find((data) => data[0] === courseCode);

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
      if (taken[3] === "TAKEN") {
        return (
          <Button variant="contained" color="primary" disabled>
            COURSE TAKEN
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

  const handleSchedule = () => {
    const sortedSchedule = myEnrolledSLoads.sort((a, b) => {
      return a[6].localeCompare(b[6]);
    });
    console.log(sortedSchedule);
    return sortedSchedule.map((data) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={data[0]}>
          <TableCell>
            {data[6]} - {data[7]}
          </TableCell>
          {scheduleColumns.map((response) => {
            return (
              <TableCell key={response.id}>
                {response.id === data[4]
                  ? data[2] + "-" + data[8]
                  : response.id === data[5]
                  ? data[2] + "-" + data[8]
                  : ""}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });
  };
  return (
    <EnrolContext.Provider
      value={{
        columns: columns,
        coursesAssignedColumns: coursesAssignedColumns,
        scheduleColumns: scheduleColumns,
        user: user,
        lecturesBySem: lecturesBySem,
        myRecommendedCoursesAssigned: myRecommendedCoursesAssigned,
        searchTerm: searchTerm,
        myDesiredSLoads: myDesiredSLoads,
        currentSem: currentSem,
        renderEnrolActions: renderEnrolActions,
        handleSearchForClass: handleSearchForClass,
        handleTypeSearch: handleTypeSearch,
        handleRemarks: handleRemarks,
        handleSchedule,
      }}
    >
      {children}
    </EnrolContext.Provider>
  );
};
