import http from "../shared/http";

export function getCurrent() {
  return http.get("/account/currentuser");
}

export function getAccounts() {
  return http.get("/account/all");
}

export function getAccountById(id) {
  return http.get(`/account/${id}`);
}

export function setActive(id) {
  return http.put(`/account/changeActiveStatus/${id}`);
}

export function setChild(id, account) {
  return http.put(`/account/changeChild/${id}`, account);
}

export function editAccountPW(username, id) {
  return http.put(`/account/changePW/${username}/${id}`);
}

export function editAccountBio(id, account) {
  return http.put(`/account/edit/${id}`, account);
}

export function generateTempPW(id) {
  return http.put(`/account/generatePWtemp/${id}`);
}

export function getAdmins() {
  return http.get("/account/admin/all");
}

export function addAdminAccount(adminAccount) {
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
  return http.get("/account/parent/all");
}

export function addParentAccount(parentAccount) {
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
  return http.get("/account/professor/all");
}

export function addProfessorAccount(professorAccount) {
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
  return http.get("/account/student/all");
}

export function addStudents(studentAccount) {
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
  return http.get("/account/currentuser/childinfo");
}
