// React
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Material Components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Component
import GradingSystem from "./GradingSystem";

// Service
import * as gradeService from "../../services/professor/GradeService";

// JOI
import Joi from "joi";

const AddGradeForm = ({ onSubmit, initialValue }) => {
  const [studentDetails, setStudentDetails] = useState([]);

  const params = useParams();

  const [form, setForm] = useState(
    initialValue || {
      gradeValue: 0,
    }
  );

  useEffect(() => {
    gradeService
      .getStudentGradePerLecture(params.studentId, params.id)
      .then((response) => {
        setStudentDetails(response?.data[0]);
      });
  }, [studentDetails, params.studentId, params.id]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    gradeValue: Joi.number().min(1).max(5).required(),
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

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);
    return !!result.error;
  };

  return (
    <>
      <GradingSystem />
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid
          item
          xs={10}
          sm={10}
          md={5}
          lg={5}
          xl={3}
          mt={10}
          marginBottom={15}
        >
          <Card>
            <Typography
              marginTop={2}
              variant="h6"
              color="#b71c1c"
              textAlign="center"
            >
              ENCODE GRADE
            </Typography>

            <CardContent>
              <Grid container spacing={2} textAlign="center" margin={2}>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                  <Typography variant="body1">
                    <strong> Student Name: </strong>
                    {studentDetails?.[5]} {studentDetails?.[7]}
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                  <Typography marginBottom={1} variant="body1">
                    <strong> Last Modified: </strong> {studentDetails?.[1]}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={4} sm={4} md={3} lg={3} xl={3} mt={2} mb={5}>
                  <TextField
                    name="gradeValue"
                    error={!!errors.gradeValue}
                    helpertext={errors.gradeValue}
                    value={form.gradeValue}
                    onChange={handleChange}
                    label="Current Grade"
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
                  navigate(`/professor/dashboard/studentLists/${params.id}`);
                }}
              >
                Back
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AddGradeForm;
