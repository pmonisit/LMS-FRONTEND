import http from "../shared/http";

export function getSemesterById(id) {
  // console.log("getSemesterById(id)");
  return http.get(`/semester/${id}`);
}

export function getSemester() {
  // console.log("getSemester()");
  return http.get("/semester/all");
}

export function getCurrentSemester() {
  // console.log("getCurrentSemester()");
  return http.get("/semester/currentsem");
}

export function editSemester(id, semester) {
  // console.log("editSemester(id, semester)");
  return http.put(`/semester/edit/${id}`, semester);
}

export function addSemester(semester) {
  // console.log("addSemester(semester)");
  const semesterClone = { ...semester };
  Object.keys(semester).forEach((key) => {
    if (
      semester[key] === "" ||
      semester[key] === null ||
      semester[key] === "undefined"
    ) {
      delete semesterClone[key];
    }
  });
  return http.post("/semester/insert", semesterClone);
}

export function editMakeCurrentSemester(id) {
  // console.log("editMakeCurrentSemester(id)");
  return http.put(`/semester/makecurrent/${id}`);
}

export function getMySemestersWithGrades() {
  // console.log("getMySemestersWithGrades()");
  return http.get("/semester/getmysems/grades");
}

export function getMyChildSemestersWithGrades() {
  // console.log("getMyChildSemestersWithGrades()");
  return http.get("/semester/getchildsems/grades");
}

export function changeIsCurrent(semesterId) {
  // console.log("changeIsCurrent(semesterId)");
  return http.put(`/semester/makecurrrent/${semesterId}`);
}
