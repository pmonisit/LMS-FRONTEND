//React;
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Component
import StudentBasicInfoForm from "./StudentBasicInfoForm";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as accountService from "../../services/shared/accounts";

const EditProfileInfo = () => {
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    accountService
      .getCurrentUser()
      .then((response) => {
        setUserInfo(response.data[0]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Account may have already been deleted.");
        }
      });
  }, [userInfo]);

  const handleEditInfo = async (form) => {
    try {
      await accountService.editUserPersonalInfo(userInfo[0], form);
      if (form.gender === userInfo[5] && form.birthdate === userInfo[6]) {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: "No changes has been made.",
        });
      } else {
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: "Your personal info has been updated",
        });
      }
      navigate(`/student/dashboard`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        onOpenSnackbar({
          open: true,
          severity: "error",
          message: "Problem occurred. Unable to update your info",
        });
      }
    }
  };

  if (userInfo) {
    return (
      <div>
        <StudentBasicInfoForm
          initialValue={{
            firstName: userInfo[2],
            middleName: userInfo[3],
            lastName: userInfo[4],
            degreeName: userInfo[12],
            gender: userInfo[5],
            birthdate: userInfo[6],
          }}
          onSubmit={handleEditInfo}
        />
      </div>
    );
  }

  return null;
};

export default EditProfileInfo;
