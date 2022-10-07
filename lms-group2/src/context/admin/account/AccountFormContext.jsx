import { createContext, useState } from "react";

export const AccountFormContext = createContext({
  accountForm: {},
  onSetAccountForm: () => {},
  studentForm: {},
  onSetStudentForm: () => {},
  step: 0,
  onSetStep: () => {},
  onNext: () => {},
  onPrev: () => {},
  steps: [],
  onHandleSubmit: () => {},
  adminForm: {},
  onSetAdminForm: () => {},
  professorForm: {},
  onSetProfessorForm: () => {},
  parentForm: {},
  onSetParentForm: () => {},
});

export const AccountFormProvider = ({ children }) => {
  const [accountForm, setAccountForm] = useState({
    role: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthdate: "",
    status: "",
    active: "",
    username: "",
    password: "",
  });

  const [studentForm, setStudentForm] = useState({
    studentId: "",
    studentNo: "",
    accountId: "",
    programId: "",
    semId: "",
    yearLevel: "",
  });

  const [adminForm, setAdminForm] = useState({
    adminNo: "",
    accountId: "",
  });

  const [professorForm, setProfessorForm] = useState({
    professorNo: "",
    accountId: "",
  });

  const [parentForm, setParentForm] = useState({
    parentNo: "",
    accountId: "",
    studentId: "",
  });

  const [step, setStep] = useState(0);

  const HandleNext = () => {
    if (step !== steps.length - 1) {
      setStep(step + 1);
      //setAccountForm(accountForm);
    }
  };

  const HandlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      console.log(step);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (step != steps.length - 1) {
    //   setStep(step + 1);
    //   setAccountForm(accountForm);
    // }
    console.log(accountForm);
  };

  const steps = ["Personal Details", "Basic Details", "Role Details", "Finish"];
  return (
    <AccountFormContext.Provider
      value={{
        accountForm,
        onSetAccountForm: setAccountForm,
        studentForm,
        onSetStudentForm: setStudentForm,
        step,
        onSetStep: setStep,
        onNext: HandleNext,
        onPrev: HandlePrev,
        steps,
        onHandleSubmit: handleSubmit,
        adminForm,
        onSetAdminForm: setAdminForm,
        professorForm,
        onSetProfessorForm: setProfessorForm,
        parentForm,
        onSetParentForm: setParentForm,
      }}
    >
      {children}
    </AccountFormContext.Provider>
  );
};