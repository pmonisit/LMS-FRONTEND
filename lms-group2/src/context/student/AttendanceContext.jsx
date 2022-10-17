import { createContext, useState, useEffect, useContext } from "react";
import * as accountService from "../../services/admin/AccountService";
import * as courseAssignedService from "../../services/admin/CoursesAssignedService";
import * as degreeService from "../../services/admin/DegreeService";
import * as semesterService from "../../services/admin/Semester";
import * as attendanceService from "../../services/professor/AttendanceService";
import { EnrolContext } from "../../context/student/EnrolContext";
import * as lectureService from "../../services/professor/LectureService";

export const AttendanceContext = createContext({
  events: [],
  currentSem: [],
  attendanceCurrentSem: [],
  attendanceCurrentSem: [],
  lecturesBySem: [],
  // handleViewAttendance: () => {},
  handleGetLectureAttendance: () => {},
});

export const AttendanceProvider = ({ children }) => {
  const [events, setEvents] = useState({ title: "", start: "" });
  const [attendanceCurrentSem, setAttendanceCurrentSem] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [lecturesBySem, setLecturesBySem] = useState([]);

  useEffect(() => {
    let attendanceBySem = [];
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
      const semId = response.data.semesterId;
      attendanceService.getAllMyAtttendancePerSem(semId).then((res) => {
        attendanceBySem.push(res.data);
        setAttendanceCurrentSem(...attendanceBySem);
        setEvents(
          res.data.map((a) => {
            return {
              ...events,
              title: a[0] + " - " + a[7],
              start: a[6],
              color:
                a[7] === "PRESENT" ? "blue" : a[7] === "LATE" ? "green" : "red",
            };
          })
        );
      });

      let lecturesBySem = [];
      lectureService.getAllLecturesBySemID(semId).then((response) => {
        lecturesBySem.push(response.data);
        lecturesBySem.map((data) => {
          setLecturesBySem(data);
        });
      });
    });
  }, []);

  // const handleViewAttendance = () => {
  //   attendanceCurrentSem.map((data) => {
  //     //   console.log(data);
  //   });
  //   lecturesBySem.map((data) => {
  //     //   console.log(data);
  //   });
  // };

  const handleGetLectureAttendance = (lectureCode) => {
    // console.log(lectureCode);
    return attendanceCurrentSem
      .filter((lecture) => lecture[0] === lectureCode)
      .map((data) => {
        return data;
      });
  };

  return (
    <AttendanceContext.Provider
      value={{
        events: events,
        currentSem: currentSem,
        attendanceCurrentSem: attendanceCurrentSem,
        attendanceCurrentSem: attendanceCurrentSem,
        // handleViewAttendance: handleViewAttendance,
        lecturesBySem: lecturesBySem,
        handleGetLectureAttendance: handleGetLectureAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};
