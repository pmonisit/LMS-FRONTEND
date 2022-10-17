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

export const ParentContext = createContext({
  user: [],
  currentSem: [],
  handleChildInfo: () => {},
});

export const ParentProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [childInfo, setChildInfo] = useState([]);

  useEffect(() => {
    accountService.getCurrent().then((response) => {
      setUser(response.data[0]);
    });
    semesterService.getCurrentSemester().then((response) => {
      setCurrentSem(response.data);
    });
    accountService.getCurrentChildInfo().then((response) => {
      setChildInfo(response.data);
    });
  }, []);

  const handleChildInfo = () => {
    childInfo.map((data) => {
      console.log(data);
    });
    return childInfo.map((data) => {
      return data;
    });
  };

  return (
    <ParentContext.Provider
      value={{
        user: user,
        currentSem: currentSem,
        handleChildInfo: handleChildInfo,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};
