import { createContext, useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as accountService from "../../services/admin/AccountService";
import * as studentLoadService from "../../services/admin/StudentLoadService";
import * as semesterService from "../../services/admin/Semester";

export const ScheduleContext = createContext({
  scheduleColumns: [],
  currentSem: [],
  handleSchedule: () => {},
});

export const ScheduleProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [myEnrolledSLoads, setMyEnrolledSLoads] = useState([]);

  useEffect(() => {
    accountService.getCurrent().then((response) => {
      setUser(response.data[0]);
    });
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
    });
    studentLoadService.getMyEnrolledStudentLoads().then((response) => {
      setMyEnrolledSLoads(response.data);
    });
  }, []);

  const scheduleColumns = [
    { id: "M", label: "Monday", minWidth: 100 },
    { id: "T", label: "Tuesday", minWidth: 100 },
    { id: "W", label: "Wednesday", minWidth: 100 },
    { id: "Th", label: "Thursday", minWidth: 100 },
    { id: "F", label: "Friday", minWidth: 100 },
    { id: "S", label: "Saturday", minWidth: 100 },
    { id: "Su", label: "Sunday", minWidth: 100 },
  ];

  const handleSchedule = () => {
    const sortedSchedule = myEnrolledSLoads.sort((a, b) => {
      let aminute = a[6].split(":").map(Number);
      let bminute = b[6].split(":").map(Number);
      return aminute[0] * 60 + aminute[1] - (bminute[0] * 60 + bminute[1]);
    });

    const conflict = (a, b) => {
      let result = false;
      let start = a.split(":").map(Number);
      let end = b.split(":").map(Number);
      let na = start[0] * 60 + start[1];
      let nb = end[0] * 60 + end[1];

      sortedSchedule.map((data) => {
        let datastart = data[6].split(":").map(Number);
        let dataend = data[7].split(":").map(Number);
        let oa = datastart[0] * 60 + datastart[1];
        let ob = dataend[0] * 60 + dataend[1];
        if ((oa > na && oa < nb) || (ob > na && ob < nb)) {
          result = true;
        }
      });
      return result;
    };

    return sortedSchedule.map((data) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={data[0]}>
          <TableCell>
            {data[6]} - {data[7]}
          </TableCell>
          {scheduleColumns.map((response) => {
            return (
              <TableCell
                key={response.id}
                sx={{
                  backgroundColor: conflict(data[6], data[7])
                    ? "#ef9a9a"
                    : "white",
                }}
              >
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
    <ScheduleContext.Provider
      value={{
        scheduleColumns: scheduleColumns,
        currentSem: currentSem,
        handleSchedule: handleSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
