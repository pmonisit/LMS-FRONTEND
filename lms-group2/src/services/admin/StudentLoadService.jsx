import http from "../http";

export function getStudentLoadById(id) {
  return http.get(`/studentload/${id}`);
}

export function getStudentLoad() {
  return http.get("/studentload/all");
}

export function editStudentLoad(id) {
  return http.put(`/studentload/edit/${id}`);
}

export function addStudentLoad(studentload) {
  const studentloadClone = { ...studentload };
  Object.keys(studentload).forEach((key) => {
    if (
      studentload[key] === "" ||
      studentload[key] === null ||
      studentload[key] === "undefined"
    ) {
      delete studentloadClone[key];
    }
  });
  return http.post("/studentload/insert", studentloadClone);
}
