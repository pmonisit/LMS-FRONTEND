import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MultiStepper from "./MultiStepper";
import AccountForm from "./AccountForm";
import AccountForm2 from "./AccountForm2";
import StudentForm from "./StudentForm";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";
import ProfessorForm from "./ProfessorForm";
import AdminForm from "./AdminForm";
import ParentForm from "./ParentForm";
import { Snackbar, Typography } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Joi from "joi";

import {
  addStudents,
  addAdminAccount,
  addParentAccount,
  addProfessorAccount,
  editAccountBio,
  setChild,
} from "../../../services/admin/AccountService";
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";
import { AdminContext } from "../../../context/admin/account/adminContext";

const GenericForm = ({ initialValue, accountId }) => {
  const navigate = useNavigate();
  const accountFormContext = useContext(AccountFormContext);
  const adminContext = useContext(AdminContext);
  const { step, steps } = accountFormContext;
  const [errors, setErrors] = useState({});
  const { onOpenSnackbar, onCloseSnackbar, snackbarConfig } =
    useContext(UserInterfaceContext);
  const { isAdmin, isProfessor, isStudent, isParent } =
    accountFormContext.isRole;
  // const { role } = accountFormContext.accountForm;
  const getRole = () => {
    if (isAdmin && !isProfessor && !isStudent && !isParent) {
      return "admin";
    } else if (!isAdmin && isProfessor && !isStudent && !isParent) {
      return "professor";
    } else if (!isAdmin && !isProfessor && isStudent && !isParent) {
      return "student";
    } else if (!isAdmin && !isProfessor && !isStudent && isParent) {
      return "parent";
    }
  };
  const [accountForm, setAccountForm] = useState(
    initialValue
      ? initialValue
      : {
          role: getRole(),
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          birthdate: "",

          active: "",
          username: "",

          childId: "",
          degreeId: "",
        }
  );

  const schema = Joi.object({
    role: Joi.optional(),
    firstName: Joi.string().min(2).required(),
    middleName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    username: Joi.string().min(5).required(),
    gender: Joi.optional(),
    birthdate: Joi.optional(),
    active: Joi.optional(),
    childId: Joi.optional(),
    degreeId: Joi.optional(),
    accountNumber: Joi.optional(),
    password: Joi.optional(),
  });

  const handleChange = (event) => {
    setAccountForm({
      ...accountForm,
      [event.currentTarget.name]: event.currentTarget.value,
    });

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

  const isGenericFormInvalid = () => {
    const result = schema.validate(accountForm);
    return !!result.error;
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();

          if (accountFormContext.isEdit) {
            editAccountBio(accountId, accountForm).then((res) => {
              onOpenSnackbar({
                open: true,
                severity: "success",
                message: "Successfully edited a User",
              });
              {
                accountForm.role === "student" &&
                  navigate("/admin/student-list");
              }
              {
                accountForm.role === "admin" && navigate("/admin/admin-list");
              }
              {
                accountForm.role === "professor" &&
                  navigate("/admin/professor-list");
              }
              {
                accountForm.role === "parent" && navigate("/admin/parent-list");
              }

              accountFormContext.onSetStep(0);
            });

            if (accountForm.role === "parent") {
              setChild(accountId, accountForm).then((res) => console.log(res));
            }
            accountFormContext.onSetIsEdit(false);
          } else {
            switch (accountForm.role) {
              case "student":
                return addStudents(accountForm)
                  .then((res) => {
                    onOpenSnackbar({
                      open: true,
                      severity: "success",
                      message: "Successfully added a Student",
                    });
                    navigate("/admin/student-list");
                    accountFormContext.onSetStep(0);
                  })
                  .catch((error) => {
                    if (error.response.status == 400) {
                      onOpenSnackbar({
                        open: true,
                        severity: "error",
                        message: "Username already exists",
                      });
                    }
                  });

                break;
              case "admin":
                return addAdminAccount(accountForm)
                  .then((res) => {
                    onOpenSnackbar({
                      open: true,
                      severity: "success",
                      message: "Successfully added an Administrator",
                    });
                    navigate("/admin/admin-list");
                    accountFormContext.onSetStep(0);
                  })
                  .catch((error) => {
                    if (error.response.status == 400) {
                      onOpenSnackbar({
                        open: true,
                        severity: "error",
                        message: "Username already exists",
                      });
                    }
                  });
                break;
              case "professor":
                return addProfessorAccount(accountForm)
                  .then((res) => {
                    onOpenSnackbar({
                      open: true,
                      severity: "success",
                      message: "Successfully added a Professor",
                    });
                    navigate("/admin/professor-list");
                    accountFormContext.onSetStep(0);
                  })
                  .catch((error) => {
                    if (error.response.status == 400) {
                      onOpenSnackbar({
                        open: true,
                        severity: "error",
                        message: "Username already exists",
                      });
                    }
                  });
                break;
              case "parent":
                return addParentAccount(accountForm)
                  .then((res) => {
                    onOpenSnackbar({
                      open: true,
                      severity: "success",
                      message: "Successfully added a Parent",
                    });
                    navigate("/admin/parent-list");
                    accountFormContext.onSetStep(0);
                  })
                  .catch((error) => {
                    if (error.response.status == 400) {
                      onOpenSnackbar({
                        open: true,
                        severity: "error",
                        message: "Username already exists",
                      });
                    }
                  });
                break;
            }
            accountFormContext.onSetIsRole({
              isStudent: false,
              isAdmin: false,
              isParent: false,
              isProfessor: false,
            });
          }
        }}
        sx={{ marginTop: "15vh", display: "flex", flexDirection: "column" }}
      >
        <Grid item xs={12} md={12} sm={12}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Account Registration
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <MultiStepper />
        </Grid>
        <Grid item xs={10} sm={10} md={12} margin={5}>
          {accountFormContext.step === 0 && (
            <AccountForm
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
              errors={errors}
              onSetErrors={setErrors}
              schema={schema}
              handleChange={handleChange}
            />
          )}
          {accountFormContext.step === 1 && (
            <AccountForm2
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
            />
          )}
        </Grid>

        <CardActions>
          <Grid container justifyContent="center" mb={5}>
            <Button
              type="button"
              onClick={(e) => {
                accountFormContext.onPrev();
              }}
            >
              Previous
            </Button>
            {step === steps.length - 1 && (
              <Button type="submit" disabled={isGenericFormInvalid()}>
                Submit
              </Button>
            )}
            {step !== steps.length - 1 && (
              <Button
                type="button"
                onClick={() => {
                  accountFormContext.onNext();
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

export default GenericForm;
