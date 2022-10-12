// React
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Material Components
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

// Context
import { UserInterfaceContext } from "../../context/shared/UserInterfaceContext";

// Service
import * as gradeService from "../../services/professor/GradeService";
import * as accountService from "../../services/shared/accounts";
import * as lectureService from "../../services/professor/LectureService";

// JOI
import Joi from "joi";
import { Typography } from "@mui/material";

const AddGradeForm = ({ onSubmit }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [studentGrade, setStudentGrade] = useState(0);
  const { onOpenSnackbar } = useContext(UserInterfaceContext);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUserInfo(response.data[0]);
      // console.log(response.data[0]);
    });

    lectureService.getStudentsPerLecture(params.id).then((response) => {
      setStudentGrade(response.data[8]);
      // console.log(response.data);
    });
  }, [userInfo, studentGrade]);

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
      if (userInfo[1] === "admin") {
        navigate(`/admin/admin-list`);
      } else if (userInfo[1] === "professor") {
        navigate(`/professor/dashboard/${userInfo[0]}`);
      } else if (userInfo[1] === "student") {
        navigate(`/dashboard`);
      } else {
        navigate(`/`);
      }
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
          <Typography>Encode grade</Typography>
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
                if (userInfo[1] === "admin") {
                  navigate(`/admin/admin-list`);
                } else if (userInfo[1] === "professor") {
                  navigate(`/professor/dashboard/${userInfo[0]}`);
                } else if (userInfo[1] === "student") {
                  navigate(`/dashboard`);
                } else {
                  navigate(`/`);
                }
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
