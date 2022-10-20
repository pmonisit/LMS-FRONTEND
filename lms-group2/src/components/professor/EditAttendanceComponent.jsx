// React
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component
import EditAttendanceForm from "./EditAttendanceForm";

// Moment
import Moment from "moment";

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
      if (form.status === attendanceDetails[2]) {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: `No changes has been made`,
        });
        navigate(
          `/professor/dashboard/checkAttendance/${attendanceDetails[3]}/${attendanceDetails[7]}`
        );
      } else {
        await attendanceService.editAttendance(attendanceDetails[0], form);

        onOpenSnackbar({
          open: true,
          severity: "success",
          message: `${Moment(attendanceDetails[1]).format(
            "MMMM DD, YYYY"
          )} attendance status has been updated`,
        });
        navigate(
          `/professor/dashboard/checkAttendance/${attendanceDetails[3]}/${attendanceDetails[7]}`
        );
      }
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
          status: attendanceDetails[2],
        }}
        onSubmit={handleEditAttendance}
      />
    );
  }
  return null;
};

export default EditAttendanceComponent;
