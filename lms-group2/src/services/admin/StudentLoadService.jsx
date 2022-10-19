import http from "../shared/http";

export function getStudentLoadById(id) {
  return http.get(`/studentload/${id}`);
}

export function getStudentLoad() {
  return http.get("/studentload/all");
}

export function editStudentLoad(id) {
  return http.put(`/studentload/edit/${id}`);
}

// export function addStudentLoad(studentload) {
//   const studentloadClone = { ...studentload };
//   Object.keys(studentload).forEach((key) => {
//     if (
//       studentload[key] === "" ||
//       studentload[key] === null ||
//       studentload[key] === "undefined"
//     ) {
//       delete studentloadClone[key];
//     }
//   });
//   return http.post("/studentload/insert", studentloadClone);
// }

export function addStudentLoad(lectureId) {
  console.log(lectureId);
  return http.post(`/studentload/enrol/${lectureId}`);
}

export function deleteStudentLoad(sloadId) {
  return http.delete(`/studentload/unenrol/${sloadId}`);
}

export function getAllMyStudentLoads() {
  return http.get("/studentload/mystudentload/all");
}

export function getMyDesiredStudentLoads() {
  return http.get("/studentload/mystudentload/desired");
}

export function getMyEnrolledStudentLoads() {
  return http.get("/studentload/mystudentload/enrolled");
}

export function getMyChildSchedule() {
  return http.get("/studentload/mychildschedule");
}

export function addClassToSched(lectureId) {
  return http.post(`/studentload/add/${lectureId}`);
}

export function getMyTempLoad() {
  return http.get("/studentload/mystudentload/temp");
}

export function sendForApproval() {
  return http.put("/studentload/sendforapproval");
}
