import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Grid, Input } from "@mui/material";
import * as accountService from "../../services/admin/AccountService";
import * as lectureService from "../../services/professor/LectureService";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as prereqService from "../../services/admin/Prerequisite";

export const EnrolContext = createContext({
  columns: [],
  coursesAssignedColumns: [],
  scheduleColumns: [],
  enrolColumns: [],
  user: [],
  lecturesBySem: [],
  myRecommendedCoursesAssigned: [],
  searchTerm: [],
  myDesiredSLoads: [],
  myEnrolledSLoads: [],
  currentSem: [],
  renderEnrolActions: () => {},
  handleSearchForClass: () => {},
  handleTypeSearch: () => {},
  handleRemarks: () => {},
  handleSchedule: () => {},
  handleEnrolLectures: () => {},
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
  const [prereqOfCourse, setPrereqOfCourse] = useState([]);
  const [mySortedCurriculum, setMySortedCurriculum] = useState([]);
  const [enrolText, setEnrolText] = useState("ENROL");
  const [unenrolText, setUnEnrolText] = useState("UNENROL");

  useEffect(() => {
    accountService.getCurrent().then((response) => {
      setUser(response.data[0]);
    });
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      let lecturesBySem = [];
      let prereqCourse = [];
      lectureService.getAllLecturesBySemID(semId).then((response) => {
        lecturesBySem.push(response.data);
        lecturesBySem.map((data) => {
          setLecturesBySem(data);
          data.map((a) => {
            let prereq = [];
            prereqService.getPrereqOfCourse(a[1]).then((response) => {
              prereq = [a[2], response.data];
              prereqCourse.push(prereq);
              setPrereqOfCourse(prereqCourse);
            });
          });
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

  const enrolColumns = [
    { id: "courseCode", label: "Course Code", minWidth: 100 },
    { id: "courseName", label: "Course Name", minWidth: 100 },
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
    setEnrolText("ENROL");
  };

  const handleUnEnrol = (sloadId) => {
    studentLoadService.deleteStudentLoad(sloadId);
    setUnEnrolText("UNENROL");
  };

  const renderEnrolActions = (lectureId, courseCode) => {
    const enrolItem = [];
    const courseAssignedOrTaken = myCoursesAssigned.find(
      (data) => data[0] === courseCode
    );
    // if (typeof courseAssignedOrTaken == "undefined") {
    //   console.log(courseCode);
    // }
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
          onClick={() => {
            handleUnEnrol(enrolItem[0][0]);
          }}
          variant="contained"
          color="primary"
        >
          {/* UNENROL */}
          {unenrolText}
        </Button>
      );
    } else if (
      typeof courseAssignedOrTaken !== "undefined" &&
      courseAssignedOrTaken[3] === "TAKEN"
    ) {
      return (
        <Button variant="contained" color="primary" disabled>
          PASSED
        </Button>
      );
    } else if (typeof courseAssignedOrTaken == "undefined") {
      return (
        <>
          <Button disabled variant="contained" color="primary">
            {/* ENROL */}
            {enrolText}
          </Button>

          <sub>
            <font color="#d32f2f">
              <i>*this course is restricted</i>
            </font>
          </sub>
        </>
      );
    } else if (
      prereqOfCourse.find(
        (course) => course[0] === courseCode && course[1].length == 0
      )
    ) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleEnrol(lectureId);
          }}
        >
          {/* ENROL */}
          {enrolText}
        </Button>
      );
    } else {
      return (
        <>
          <Button disabled variant="contained" color="primary">
            {/* ENROL */}
            {enrolText}
          </Button>

          <sub>
            <font color="#d32f2f">
              <i>*with prerequisite</i>
            </font>
          </sub>
        </>
      );
    }
  };

  const handleSearchForClass = (term) => {
    setSearchTerm(term);
    navigate("/student/courses");
  };

  const handleTypeSearch = () => {
    return (
      <Grid>
        <div align="center">
          <Input
            type="text"
            placeholder="Search Course..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </Button>
        </div>
      </Grid>
    );
  };

  const handleRemarks = (courseCode) => {
    const sl = [];
    const s2 = [];

    sl.splice(
      0,
      1,
      myEnrolledSLoads.find((demo) => demo[2] === courseCode)
    );

    s2.splice(
      0,
      1,
      myDesiredSLoads.find((demo) => demo[2] === courseCode)
    );
    if (sl[0]) {
      return (
        <Button disabled variant="contained" color="primary">
          ENROLLED
        </Button>
      );
    } else if (s2[0]) {
      return (
        <Button disabled variant="contained" color="primary">
          DESIRED
        </Button>
      );
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

  const handleEnrolLectures = (lecture) => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={lecture[1]}>
        <TableCell>{lecture[2]}</TableCell>
        <TableCell>{lecture[3]}</TableCell>
        <TableCell>{lecture[16]}</TableCell>
        <TableCell>
          {lecture[4]}
          {lecture[5]} {lecture[6]}-{lecture[7]}
        </TableCell>
        <TableCell>{lecture[8]}</TableCell>
        <TableCell>
          {lecture[13]}, {lecture[12]}
        </TableCell>
        <TableCell>{lecture[14]}</TableCell>
        <TableCell>{lecture[15]}</TableCell>
        <TableCell>{renderEnrolActions(lecture[1], lecture[2])}</TableCell>
      </TableRow>
    );
  };

  return (
    <EnrolContext.Provider
      value={{
        columns: columns,
        coursesAssignedColumns: coursesAssignedColumns,
        scheduleColumns: scheduleColumns,
        enrolColumns: enrolColumns,
        user: user,
        lecturesBySem: lecturesBySem,
        myRecommendedCoursesAssigned: myRecommendedCoursesAssigned,
        searchTerm: searchTerm,
        myDesiredSLoads: myDesiredSLoads,
        myEnrolledSLoads: myEnrolledSLoads,
        currentSem: currentSem,
        renderEnrolActions: renderEnrolActions,
        handleSearchForClass: handleSearchForClass,
        handleTypeSearch: handleTypeSearch,
        handleRemarks: handleRemarks,
        handleSchedule: handleSchedule,
        handleEnrolLectures: handleEnrolLectures,
      }}
    >
      {children}
    </EnrolContext.Provider>
  );
};
