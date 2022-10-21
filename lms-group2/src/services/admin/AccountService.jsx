import http from "../shared/http";

export function getCurrent() {
  // console.log("getCurrent");
  return http.get("/account/currentuser");
}

export function getAccounts() {
  // console.log("getAccounts");
  return http.get("/account/all");
}

export function getAccountById(id) {
  // console.log("getAccountById");
  return http.get(`/account/${id}`);
}

export function setActive(id) {
  // console.log("setActive(id)");
  return http.put(`/account/changeActiveStatus/${id}`);
}

export function setChild(id, account) {
  // console.log("setChild(id, account)");
  return http.put(`/account/changeChild/${id}`, account);
}

export function editAccountPW(username, id) {
  // console.log("editAccountPW(username, id)");
  return http.put(`/account/changePW/${username}/${id}`);
}

export function editAccountBio(id, account) {
  // console.log("editAccountBio(id, account)");
  return http.put(`/account/edit/${id}`, account);
}

export function generateTempPW(id) {
  // console.log("generateTempPW(id)");
  return http.put(`/account/generatePWtemp/${id}`);
}

export function getAdmins() {
  // console.log("getAdmins()");
  return http.get("/account/admin/all");
}

export function addAdminAccount(adminAccount) {
  // console.log("addAdminAccount(adminAccount)");
  const adminAccountClone = { ...adminAccount };
  Object.keys(adminAccount).forEach((key) => {
    if (
      adminAccount[key] === "" ||
      adminAccount[key] === null ||
      adminAccount[key] === "undefined"
    ) {
      delete adminAccountClone[key];
    }
  });
  return http.post("/account/admin/register", adminAccountClone);
}

export function getParents() {
  // console.log("getParents()");
  return http.get("/account/parent/all");
}

export function addParentAccount(parentAccount) {
  // console.log("addParentAccount(parentAccount)");
  const parentAccountClone = { ...parentAccount };
  Object.keys(parentAccount).forEach((key) => {
    if (
      parentAccount[key] === "" ||
      parentAccount[key] === null ||
      parentAccount[key] === "undefined"
    ) {
      delete parentAccountClone[key];
    }
  });
  return http.post("/account/parent/register", parentAccountClone);
}

export function getProfessors() {
  // console.log("getProfessors()");
  return http.get("/account/professor/all");
}

export function addProfessorAccount(professorAccount) {
  // console.log("addProfessorAccount(professorAccount)");
  const professorAccountClone = { ...professorAccount };
  Object.keys(professorAccount).forEach((key) => {
    if (
      professorAccount[key] === "" ||
      professorAccount[key] === null ||
      professorAccount[key] === "undefined"
    ) {
      delete professorAccountClone[key];
    }
  });
  return http.post("/account/professor/register", professorAccountClone);
}

export function getStudents() {
  // console.log("getStudents()");
  return http.get("/account/student/all");
}

export function addStudents(studentAccount) {
  // console.log("addStudents(studentAccount)");
  const studentAccountClone = { ...studentAccount };
  Object.keys(studentAccount).forEach((key) => {
    if (
      studentAccount[key] === "" ||
      studentAccount[key] === null ||
      studentAccount[key] === "undefined"
    ) {
      delete studentAccountClone[key];
    }
  });
  return http.post("/account/student/register", studentAccountClone);
}

export function getCurrentChildInfo() {
  // console.log("getCurrentChildInfo()");
  return http.get("/account/currentuser/childinfo");
}
