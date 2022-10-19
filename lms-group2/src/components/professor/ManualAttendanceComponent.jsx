// React
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component
import ManualAttendanceForm from "./ManualAttendanceForm";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as attendanceService from "../../services/professor/AttendanceService";

const ManualAttendanceComponent = () => {
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const navigate = useNavigate();

  const params = useParams();

  const handleAddAttendance = async (form) => {
    try {
      await attendanceService.addManualAttendance(
        params.lectureId,
        params.studentId,
        form
      );
      onOpenSnackbar({
        open: true,
        severity: "success",
        message: `Attendance has been added`,
      });
      navigate(
        `/professor/dashboard/checkAttendance/${params.studentId}/${params.lectureId}`
      );
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "info",
        message: "Date is already exists.",
      });
    }
  };

  return (
    <div>
      <ManualAttendanceForm onSubmit={handleAddAttendance} />
    </div>
  );
};

export default ManualAttendanceComponent;
