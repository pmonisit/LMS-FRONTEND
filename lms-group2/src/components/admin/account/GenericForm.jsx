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
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

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

  return (
    <>
      <Grid
        container
        justifyContent="center"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();

          //console.log(accountFormContext.accountForm);
          if (accountFormContext.isEdit) {
            editAccountBio(accountId, accountForm).then((res) => {
              console.log(res);
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
              console.log("set child id");
            }
            accountFormContext.onSetIsEdit(false);
            console.log(accountId, accountForm);
          } else {
            switch (accountForm.role) {
              case "student":
                return addStudents(accountForm).then((res) => {
                  console.log("From student");
                  console.log(res);
                  onOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Successfully added a Student",
                  });
                  navigate("/admin/student-list");
                  accountFormContext.onSetStep(0);
                });
                break;
              case "admin":
                console.log(accountFormContext.adminForm);

                return addAdminAccount(accountForm).then((res) => {
                  console.log("From admin");
                  console.log(res);
                  onOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Successfully added an Administrator",
                  });
                  navigate("/admin/admin-list");
                  accountFormContext.onSetStep(0);
                });
                break;
              case "professor":
                return addProfessorAccount(accountForm).then((res) => {
                  console.log("From professor");
                  console.log(res);
                  onOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Successfully added a Professor",
                  });
                  navigate("/admin/professor-list");
                  accountFormContext.onSetStep(0);
                });
                break;
              case "parent":
                return addParentAccount(accountForm).then((res) => {
                  console.log("From parent");
                  console.log(res);
                  onOpenSnackbar({
                    open: true,
                    severity: "success",
                    message: "Successfully added a Parent",
                  });
                  navigate("/admin/parent-list");
                  accountFormContext.onSetStep(0);
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
          <MultiStepper />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          {accountFormContext.step === 0 && (
            <AccountForm
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
            />
          )}
          {accountFormContext.step === 1 && (
            <AccountForm2
              accountForm={accountForm}
              onSetAccountForm={setAccountForm}
            />
          )}
          {/* {accountFormContext.step === 2 && role === "student" && (
            <StudentForm />
          )}
          {accountFormContext.step === 2 && role === "professor" && (
            <ProfessorForm />
          )}
          {accountFormContext.step === 2 && role === "admin" && <AdminForm />}
          {accountFormContext.step === 2 && role === "parent" && <ParentForm />} */}
        </Grid>

        <CardActions>
          <Button
            type="button"
            onClick={(e) => {
              console.log("prev");
              accountFormContext.onPrev();
            }}
          >
            Previous
          </Button>
          {step === steps.length - 1 && <Button type="submit">Submit</Button>}
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
        </CardActions>
      </Grid>
    </>
  );
};

export default GenericForm;
