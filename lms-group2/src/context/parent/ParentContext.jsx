import { createContext, useState, useEffect } from "react";
import * as accountService from "../../services/admin/AccountService";
import * as semesterService from "../../services/admin/Semester";

export const ParentContext = createContext({
  user: [],
  currentSem: [],
  handleChildInfo: () => {},
});

export const ParentProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [currentSem, setCurrentSem] = useState([]);
  const [childInfo, setChildInfo] = useState([]);

  useEffect(() => {
    accountService
      .getCurrent()
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Account may have already been deleted.");
        }
      });
    semesterService
      .getCurrentSemester()
      .then((response) => {
        setCurrentSem(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Semester may have already been deleted.");
        }
      });
    accountService
      .getCurrentChildInfo()
      .then((response) => {
        setChildInfo(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Account may have already been deleted.");
        }
      });
  }, []);

  const handleChildInfo = () => {
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
