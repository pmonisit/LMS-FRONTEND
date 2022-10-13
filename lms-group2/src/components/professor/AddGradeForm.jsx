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

const AddGradeForm = ({ onSubmit, initialValue }) => {
  const [lectureId, setLectureId] = useState(0);
  const [form, setForm] = useState(
    initialValue || {
      gradeValue: 0,
    }
  );

  useEffect(() => {
    lectureService.getProfLoad().then((response) => {
      setLectureId(response.data[0][0]);
    });
  }, [lectureId]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    gradeValue: Joi.number().min(0).max(5).required(),
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
    <Grid
      container
      justifyContent="center"
      component="form"
      onSubmit={handleSubmit}
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
