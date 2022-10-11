// React
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Component
import BasicInfoForm from "./BasicInfoForm";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as accountService from "../../services/shared/accounts";

const EditProfileInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const navigate = useNavigate();

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUserInfo(response.data[0]);
    });
  }, [userInfo]);

  const handleEditInfo = async (form) => {
    try {
      await accountService.editUserPersonalInfo(userInfo[0], form);
      if (
        form.firstName === userInfo[2] &&
        form.middleName === userInfo[3] &&
        form.lastName === userInfo[4] &&
        form.gender === userInfo[5] &&
        form.birthdate === userInfo[6]
      ) {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: "No changes has been made.",
        });
        navigate("/profile");
      } else {
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: "Your personal info has been updated",
        });
        navigate("/profile");
      }
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
        <BasicInfoForm
          initialValue={{
            firstName: userInfo[2],
            middleName: userInfo[3],
            lastName: userInfo[4],
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
