import React, { useContext, useState } from "react";
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

const LectureFormHolder = ({ initialValue, lectureId }) => {
  const params = useParams();
  const adminContext = useContext(AdminContext);
  const [lectureStep, setLectureStep] = useState(0);
  const lectureSteps = ["Basic Info", "Other Details"];
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
      console.log(lectureStep);
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
          console.log(lectureForm);
          if (adminContext.isEditLecture) {
            console.log("edit");
            // editAccountBio(accountId, accountForm).then((res) =>
            //   console.log(res)
            // );
            // if (accountForm.role === "parent") {
            //   setChild(accountId, accountForm).then((res) => console.log(res));
            //   console.log("set child id");
            // }
            // accountFormContext.onSetIsEdit(false);
            // console.log(accountId, accountForm);
          } else {
            console.log("add");
            professorService.addLecture(lectureForm).then((res) => {
              console.log(res.data);
              adminContext.onSetLectureList(res.data);
            });
          }
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
            />
          )}
          {lectureStep === 1 && (
            <LectureForm2
              lectureForm={lectureForm}
              onSetLectureForm={setLectureForm}
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
