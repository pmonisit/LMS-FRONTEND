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

const LectureFormHolder = ({ initialValue, lectureId }) => {
  console.log(initialValue);

  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const params = useParams();
  const adminContext = useContext(AdminContext);
  const [lectureStep, setLectureStep] = useState(0);
  const lectureSteps = ["Basic Info", "Other Details"];
  const [isEdit, setEdit] = useState(true);

  // const lectureObject = {
  //   section: initialValue[11],
  //   courseId: initialValue[1],
  //   accountId: initialValue[6],
  //   semesterId: initialValue[19],
  //   dayOne: initialValue[12],
  //   dayTwo: initialValue[13],
  //   startTime: initialValue[14],
  //   endTime: initialValue[15],
  //   capacity: initialValue[16],
  //   desired: initialValue[17],
  // };

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

  console.log(lectureForm);
  const handleLectureNext = () => {
    if (lectureStep !== lectureSteps.length - 1) {
      setLectureStep(lectureStep + 1);
      //setAccountForm(accountForm);
    }
  };

  const handleLecturePrev = () => {
    if (lectureStep > 0) {
      setLectureStep(lectureStep - 1);
      console.log(lectureStep);
    }
  };

  const handleAddLecture = async (lecture) => {
    const response = await professorService.addLecture(lecture);
    adminContext.onSetLectureList(response.data);
    onOpenSnackbar({
      open: true,
      severity: "success",
      message: "Successfully added a Lecture",
    });
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(lectureForm);

          if (adminContext.isEditLecture) {
            console.log("edit");
            lectureService.editLecture(lectureId, lectureForm).then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a Lecture",
              });
              adminContext.onSetIsEditLecture(false);
              navigate("/admin/lecture-list");
            });
          } else {
            console.log("Add");
            handleAddLecture(lectureForm);

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

          // if (adminContext.isEditLecture) {
          //   console.log("edit");
          //   lectureService.editLecture(lectureId, lectureForm).then((res) => {
          //     console.log(res);
          //     onOpenSnackbar({
          //       open: true,
          //       severity: "success",
          //       message: "Successfully edited a Lecture",
          //     });
          //     // navigate("/admin/lecture-list");
          //   });
          //   adminContext.onSetIsEdit(false);
          // } else {
          //   console.log("add");
          //   // handleAddLecture(lectureForm);
          //   // navigate("/admin/lecture-list");
          //   professorService.addLecture(lectureForm).then((res) => {
          //     console.log(res.data);
          //     adminContext.onSetLectureList(res.data);
          //     console.log(adminContext.lectureList);
          //     // navigate("/admin/lecture-list");
          //   });
          //   onOpenSnackbar({
          //     open: true,
          //     severity: "success",
          //     message: "Successfully added a Lecture",
          //   });
          // }
        }}
        sx={{ marginTop: "15vh", display: "flex", flexDirection: "column" }}
      >
        <Grid item xs={12} md={12} sm={12}>
          <MultiStepper step={lectureStep} steps={lectureSteps} />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
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
          <Button
            type="button"
            onClick={(e) => {
              console.log("prev");
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
        </CardActions>
      </Grid>
    </>
  );
};

export default LectureFormHolder;
