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
      setUserInfo(response.data);
    });
  }, [userInfo]);

  const handleEditInfo = async (form) => {
    try {
      await accountService.editUserPersonalInfo(userInfo.accountId, form);
      if (
        form.firstName === userInfo.firstName &&
        form.middleName === userInfo.middleName &&
        form.lastName === userInfo.lastName &&
        form.gender === userInfo.gender &&
        form.birthdate === userInfo.birthdate
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
            firstName: userInfo.firstName,
            middleName: userInfo.middleName,
            lastName: userInfo.lastName,
            gender: userInfo.gender,
            birthdate: userInfo.birthdate,
          }}
          onSubmit={handleEditInfo}
        />
      </div>
    );
  }

  return null;
};

export default EditProfileInfo;
