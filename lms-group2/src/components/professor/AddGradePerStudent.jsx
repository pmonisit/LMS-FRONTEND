// React
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component
import AddGradeForm from "./AddGradeForm";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as gradeService from "../../services/professor/GradeService";
import * as lectureService from "../../services/professor/LectureService";

// JOI
import Joi from "joi";
import { Typography } from "@mui/material";

const AddGradePerStudent = () => {
  const [studentGrade, setStudentGrade] = useState(0);
  const [lectureId, setLectureId] = useState(0);
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    lectureService.getProfLoad().then((response) => {
      setLectureId(response.data[0][0]);
    });

    gradeService
      .getStudentGradePerLecture(params.studentId, lectureId)
      .then((response) => {
        setStudentGrade(response.data[0]);
        // console.log(studentGrade[2]);
      });
  }, [studentGrade, lectureId]);

  const handleAddGrade = async (form) => {
    try {
      if (form.gradeValue === studentGrade[2]) {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: `No changes has been made`,
        });
        navigate(`/professor/dashboard/studentLists/${lectureId}`);
      } else {
        await gradeService.editGrade(params.id, form);
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: `${studentGrade[5]}'s grade has been updated`,
        });
        navigate(`/professor/dashboard/studentLists/${lectureId}`);
      }
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Error in updating grade",
      });
    }
  };

  if (studentGrade) {
    return (
      <div>
        <AddGradeForm
          initialValue={{
            gradeValue: studentGrade[2],
          }}
          onSubmit={handleAddGrade}
        />
      </div>
    );
  }

  return null;
};

export default AddGradePerStudent;
