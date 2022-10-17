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
      // console.log(response.data[0]);
      setAttendanceDetails(response.data[0]);
    });
  }, [attendanceDetails, params.id]);

  const handleEditAttendance = async (form) => {
    try {
      await attendanceService.editAttendance(attendanceDetails[0], form);
      onOpenSnackbar({
        open: true,
        severity: "success",
        message: `Attendance has been updated`,
      });
      navigate(`/professor/dashboard/checkAttendance/${attendanceDetails[3]}`);
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Error in updating attendance",
      });
    }
  };

  if (attendanceDetails) {
    return (
      <EditAttendanceForm
        initialValue={{
          attendanceDate: attendanceDetails[1],
          status: attendanceDetails[2],
        }}
        onSubmit={handleEditAttendance}
      />
    );
  }
  return null;
};

export default EditAttendanceComponent;
