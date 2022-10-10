import React, { useContext, useState } from "react";
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

import {
  addStudents,
  addAdminAccount,
  addParentAccount,
  addProfessorAccount,
  editAccountBio,
} from "../../../services/admin/AccountService";

const GenericForm = ({ initialValue, accountId }) => {
  const accountFormContext = useContext(AccountFormContext);
  const { step, steps } = accountFormContext;
  // const { role } = accountFormContext.accountForm;

  const [accountForm, setAccountForm] = useState(
    initialValue
      ? initialValue
      : {
          role: "",
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
            editAccountBio(accountId, accountForm).then((res) =>
              console.log(res)
            );
            accountFormContext.onSetIsEdit(false);
          } else {
            switch (accountForm.role) {
              case "student":
                return addStudents(accountForm).then((res) => {
                  console.log("From student");
                  console.log(res);
                });

                break;
              case "admin":
                console.log(accountFormContext.adminForm);
                return addAdminAccount(accountForm).then((res) => {
                  console.log("From admin");
                  console.log(res);
                });
                break;
              case "professor":
                return addProfessorAccount(accountForm).then((res) => {
                  console.log("From professor");
                  console.log(res);
                });
                break;
              case "parent":
                return addParentAccount(accountForm).then((res) => {
                  console.log("From parent");
                  console.log(res);
                });
                break;
            }
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
