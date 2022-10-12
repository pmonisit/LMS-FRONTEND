// React
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Material Components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as gradeService from "../../services/professor/GradeService";
import * as lectureService from "../../services/professor/LectureService";

// JOI
import Joi from "joi";
import { Typography } from "@mui/material";

const AddGradeForm = () => {
  const [lectureId, setLectureId] = useState(0);
  const [studentGrade, setStudentGrade] = useState(0);
  const { onOpenSnackbar } = useContext(UserInterfaceContext);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    lectureService.getProfLoad().then((response) => {
      setLectureId(response.data[0][0]);
    });

    lectureService.getStudentsPerLecture(lectureId).then((response) => {
      setStudentGrade(response.data[0][8]);
      console.log(studentGrade);
    });
  }, [lectureId, studentGrade]);

  const [form, setForm] = useState({
    gradeValue: 0.0,
  });

  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    gradeValue: Joi.number().min(0.0).max(5.0).required(),
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });

    const { error } = schema
      .extract(event.currentTarget.name)
      .label(event.currentTarget.name)
      .validate(event.currentTarget.value);
    if (error) {
      setErrors({
        ...errors,
        [event.currentTarget.name]: error.details[0].message,
      });
    } else {
      delete errors[event.currentTarget.name];
      setErrors(errors);
    }
  };

  const handleAddGrade = async (event) => {
    event.preventDefault();
    try {
      await gradeService.editGrade(params.id, form);
      onOpenSnackbar({
        open: true,
        severity: "success",
        message: "Grade has been updated",
      });
      navigate(`/professor/dashboard/studentLists/${lectureId}`);
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Error in updating grade",
      });
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);
    return !!result.error;
  };

  return (
    <Grid
      container
      justifyContent="center"
      component="form"
      onSubmit={handleAddGrade}
    >
      <Grid item xs={10} sm={10} md={2} lg={2} xl={2} mt={5}>
        <Card>
          <Typography>Encode Grade</Typography>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="gradeValue"
                  error={!!errors.gradeValue}
                  helpertext={errors.gradeValue}
                  value={form.gradeValue}
                  onChange={handleChange}
                  label="Grade"
                  variant="standard"
                  type="number"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isFormInvalid()}
            >
              Save
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                navigate(`/professor/dashboard/studentLists/${lectureId}`);
              }}
            >
              Back
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddGradeForm;
