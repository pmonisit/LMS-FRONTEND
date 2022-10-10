import { createContext, useState } from "react";
import * as adminService from "../../../services/admin/AccountService";

export const AccountFormContext = createContext({
  // accountForm: {},
  // onSetAccountForm: () => {},
  initialValue: {},
  onSetIntitialValue: () => {},
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
  accountList: [],
  onSetAccountList: () => {},
  adminList: [],
  onSetAdminList: () => {},
  studentList: [],
  onSetStudentList: () => {},
  professorList: [],
  onSetProfessorList: () => {},
  parentList: [],
  onSetParentList: () => {},
  isEdit: false,
  onSetIsEdit: () => {},
});

export const AccountFormProvider = ({ children }) => {
  //----------States-----------------
  const [initialValue, setInitialValue] = useState({});
  // const [accountForm, setAccountForm] = useState(
  //   initialValue
  //     ? initialValue
  //     : {
  //         role: "",
  //         firstName: "",
  //         middleName: "",
  //         lastName: "",
  //         gender: "",
  //         birthdate: "",
  //         status: "",
  //         active: "",
  //         username: "",
  //         password: "",
  //         childId: "",
  //         degreeId: "",
  //       }
  // );

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
  const [accountList, setAccountList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [professorList, setProfessorList] = useState([]);
  const [parentList, setParentList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  //----------Methods-----------------------

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

  const steps = ["Personal Details", "Basic Details", "Finish"];
  return (
    <AccountFormContext.Provider
      value={{
        // accountForm,
        // onSetAccountForm: setAccountForm,
        initialValue,
        onSetIntitialValue: setInitialValue,
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
        accountList,
        onSetAccountList: setAccountList,
        adminList,
        onSetAdminList: setAdminList,
        studentList,
        onSetStudentList: setStudentList,
        professorList,
        onSetProfessorList: setProfessorList,
        parentList,
        onSetParentList: setParentList,
        isEdit,
        onSetIsEdit: setIsEdit,
      }}
    >
      {children}
    </AccountFormContext.Provider>
  );
};
