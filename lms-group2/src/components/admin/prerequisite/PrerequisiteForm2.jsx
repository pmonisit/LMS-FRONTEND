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
    courseService.getCourse().then((res) => {
      setCourses(res.data);
    });
  }, []);
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
      sx={{ marginTop: "15vh" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();

        if (adminContext.isEditPrerequisite) {
          prerequisiteService
            .editPrerequisite(prerequisiteId, prerequisiteForm)
            .then((res) => {
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a Prerequisite",
              });
              adminContext.onSetIsEditPrerequisite(false);
              navigate("/admin/prerequisite-list");
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
          prerequisiteService
            .addPrerequisite(prerequisiteForm)
            .then((res) => {
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully added a Prerequisite",
              });
              adminContext.onSetIsEditPrerequisite(false);
              navigate("/admin/prerequisite-list");
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
        }
      }}
    >
      <Grid item xs={10} md={3} sm={6}>
        <Card>
          <CardHeader title="Add Pre-Requisite" />

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
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PrerequisiteForm2;
