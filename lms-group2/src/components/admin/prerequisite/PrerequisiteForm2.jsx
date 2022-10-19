import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import * as prerequisiteService from "../../../services/admin/Prerequisite";
import CourseSelection from "./CourseSelection";
import * as courseService from "../../../services/admin/CourseService";
import { AdminContext } from "../../../context/admin/account/adminContext";
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";

const PrerequisiteForm2 = ({ initialValue, prerequisiteId }) => {
  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    courseService.getCourse().then((res) => setCourses(res.data));
  });
  const params = useParams();
  const adminContext = useContext(AdminContext);
  const [prerequisiteForm, setPrerequisiteForm] = useState(
    initialValue
      ? initialValue
      : {
          courseId: params.id,
          prerequisiteCourseId: "",
        }
  );
  const { courseId, prerequisiteCourseId } = prerequisiteForm;

  const handleChange = (event) => {
    setPrerequisiteForm({
      ...prerequisiteForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: "5vh" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(prerequisiteForm);
        if (adminContext.isEditPrerequisite) {
          console.log("Edit");
          console.log(prerequisiteForm);

          prerequisiteService
            .editPrerequisite(prerequisiteId, prerequisiteForm)
            .then((res) => {
              console.log(res);
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a Prerequisite",
              });
            });
          adminContext.onSetIsEditPrerequisite(false);
        } else {
          console.log("Add");
          prerequisiteService.addPrerequisite(prerequisiteForm).then((res) => {
            console.log(res);
            onOpenSnackbar({
              open: true,
              severity: "success",
              message: "Successfully added a Prerequisite",
            });
          });
        }
        navigate("/admin/prerequisite-list");
      }}
    >
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardHeader title="Table" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* <TextField
                  name="prerequisiteCourseId"
                  onChange={handleChange}
                  value={prerequisiteCourseId}
                  label="Prerequisite Course"
                  variant="standard"
                  fullWidth
                /> */}
                <CourseSelection
                  list={courses}
                  form={prerequisiteForm}
                  onSetForm={setPrerequisiteForm}
                  id={prerequisiteCourseId}
                  label="Prerequisite Course"
                  selectedId={params.id}
                />
              </Grid>
            </Grid>

            <CardActions>
              <Button type="submit">Submit</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PrerequisiteForm2;
