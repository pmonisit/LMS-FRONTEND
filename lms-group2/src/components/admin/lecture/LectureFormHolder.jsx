import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MultiStepper from "../../shared/MultiStepper";
import LectureForm from "./LectureForm";
import LectureForm2 from "./LectureForm2";
import { AdminContext } from "../../../context/admin/account/adminContext";
import * as professorService from "../../../services/professor/LectureService";
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";
import * as lectureService from "../../../services/professor/LectureService";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import { Typography } from "@mui/material";

const LectureFormHolder = ({ initialValue, lectureId }) => {
  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const params = useParams();
  const adminContext = useContext(AdminContext);
  const [lectureStep, setLectureStep] = useState(0);
  const lectureSteps = ["Basic Info", "Other Details"];
  const [isEdit, setEdit] = useState(true);

  const [lectureForm, setLectureForm] = useState(
    initialValue
      ? initialValue
      : {
          section: "",
          courseId: "",
          accountId: params.id,
          semesterId: "",
          dayOne: "",
          dayTwo: "",
          startTime: "",
          endTime: "",
          capacity: "",
          desired: "",
        }
  );

  const handleLectureNext = () => {
    if (lectureStep !== lectureSteps.length - 1) {
      setLectureStep(lectureStep + 1);
      //setAccountForm(accountForm);
    }
  };

  const handleLecturePrev = () => {
    if (lectureStep > 0) {
      setLectureStep(lectureStep - 1);
    }
  };

  const handleAddLecture = async (lecture) => {
    try {
      const response = await professorService.addLecture(lecture);
      adminContext.onSetLectureList(response.data);
      onOpenSnackbar({
        open: true,
        severity: "success",
        message: "Successfully added a Lecture",
      });
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Please fill up all the fields",
      });
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();

          if (adminContext.isEditLecture) {
            lectureService
              .editLecture(lectureId, lectureForm)
              .then((res) => {
                onOpenSnackbar({
                  open: true,
                  severity: "success",
                  message: "Successfully edited a Lecture",
                });
                adminContext.onSetIsEditLecture(false);
                navigate("/admin/lecture-list");
              })
              .catch((error) => {
                if (error.response.status == 400) {
                  onOpenSnackbar({
                    open: true,
                    severity: "error",
                    message: "Please fill up all the fields",
                  });
                }
              });
          } else {
            handleAddLecture(lectureForm);
            adminContext.onSetIsEditLecture(false);

            setLectureStep(0);
            setLectureForm({
              section: "",
              courseId: "",
              accountId: params.id,
              semesterId: "",
              dayOne: "",
              dayTwo: "",
              startTime: "",
              endTime: "",
              capacity: "",
            });
          }
        }}
        sx={{ marginTop: "15vh", display: "flex", flexDirection: "column" }}
      >
        <Grid item xs={12} md={12} sm={12}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Create Lecture
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <MultiStepper step={lectureStep} steps={lectureSteps} />
        </Grid>
        <Grid item xs={10} sm={10} md={12} margin={5}>
          {lectureStep === 0 && (
            <LectureForm
              lectureForm={lectureForm}
              onSetLectureForm={setLectureForm}
              lectureId={lectureId}
            />
          )}
          {lectureStep === 1 && (
            <LectureForm2
              lectureForm={lectureForm}
              onSetLectureForm={setLectureForm}
              lectureId={lectureId}
            />
          )}
        </Grid>

        <CardActions>
          <Grid container justifyContent="center" mb={5}>
            <Button
              type="button"
              onClick={(e) => {
                handleLecturePrev();
              }}
            >
              Previous
            </Button>
            {lectureStep === lectureSteps.length - 1 && (
              <Button type="submit">Submit</Button>
            )}
            {lectureStep !== lectureSteps.length - 1 && (
              <Button
                type="button"
                onClick={() => {
                  handleLectureNext();
                }}
              >
                Next
              </Button>
            )}
          </Grid>
        </CardActions>
      </Grid>
    </>
  );
};

export default LectureFormHolder;
