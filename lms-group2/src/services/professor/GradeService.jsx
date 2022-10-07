import http from "../http";

export function getGradeById(id) {
  return http.get(`/grade/${id}`);
}

export function getGrade() {
  return http.get("/grade/all");
}

export function deleteGrade(id) {
  return http.delete(`/grade/delete/${id}`);
}

export function editGrade(id) {
  return http.put(`/grade/edit/${id}`);
}

export function addGrade(grade) {
  const gradeClone = { ...grade };
  Object.keys(grade).forEach((key) => {
    if (
      grade[key] === "" ||
      grade[key] === null ||
      grade[key] === "undefined"
    ) {
      delete gradeClone[key];
    }
  });
  return http.post("/grade/insert", gradeClone);
}
