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

const AddGradePerStudent = () => {
  const [studentGrade, setStudentGrade] = useState(0);

  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    gradeService
      .getStudentGradePerLecture(params.studentId, params.id)
      .then((response) => {
        setStudentGrade(response?.data[0]);
      });
  }, [params.studentId, studentGrade, params.id]);

  const handleAddGrade = async (form) => {
    try {
      if (form.gradeValue === studentGrade[2]) {
        onOpenSnackbar({
          open: true,
          severity: "info",
          message: `No changes has been made`,
        });
        navigate(`/professor/dashboard/studentLists/${params.id}`);
      } else {
        await gradeService.editGrade(studentGrade[0], form);
        onOpenSnackbar({
          open: true,
          severity: "success",
          message: `${studentGrade[5]}'s grade has been updated`,
        });
        navigate(`/professor/dashboard/studentLists/${params.id}`);
      }
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Error in updating grade. It might been tagged as Final",
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
