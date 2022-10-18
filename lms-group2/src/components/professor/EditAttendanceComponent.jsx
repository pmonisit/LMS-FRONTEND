// React
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component
import EditAttendanceForm from "./EditAttendanceForm";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as attendanceService from "../../services/professor/AttendanceService";

const EditAttendanceComponent = () => {
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const { onOpenSnackbar } = useContext(UserInterfaceContext);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    attendanceService.getAttendanceById(params.id).then((response) => {
      setAttendanceDetails(response.data[0]);
    });
  }, [attendanceDetails, params.id]);

  const handleEditAttendance = async (form) => {
    try {
      await attendanceService.editAttendance(attendanceDetails[0], form);
      console.log(form);
      onOpenSnackbar({
        open: true,
        severity: "success",
        message: `Attendance has been updated`,
      });
      navigate(
        `/professor/dashboard/checkAttendance/${attendanceDetails[3]}/${attendanceDetails[7]}`
      );
    } catch (error) {
      console.log(form);
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Error in updating attendance",
      });
    }
  };

  if (attendanceDetails) {
    return <EditAttendanceForm onSubmit={handleEditAttendance} />;
  }
  return null;
};

export default EditAttendanceComponent;
