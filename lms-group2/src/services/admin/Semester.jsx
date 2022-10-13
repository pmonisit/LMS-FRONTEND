import http from "../shared/http";

export function getSemesterById(id) {
  return http.get(`/semester/${id}`);
}

export function getSemester() {
  return http.get("/semester/all");
}

export function getCurrentSemester() {
  return http.get("/semester/currentsem");
}

export function editSemester(id, semester) {
  return http.put(`/semester/edit/${id}`, semester);
}

export function addSemester(semester) {
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
  return http.put(`/semester/makecurrent/${id}`);
}

export function getMySemestersWithGrades() {
  return http.get("/semester/getmysems/grades");
}
