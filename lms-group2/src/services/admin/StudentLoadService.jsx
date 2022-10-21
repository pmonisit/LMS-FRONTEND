import http from "../shared/http";

export function getStudentLoadById(id) {
  // console.log("getStudentLoadById(id)");
  return http.get(`/studentload/${id}`);
}

export function getStudentLoad() {
  // console.log("getStudentLoad()");
  return http.get("/studentload/all");
}

export function editStudentLoad(id) {
  // console.log("editStudentLoad(id)");
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
  // console.log("addStudentLoad(lectureId)");
  return http.post(`/studentload/enrol/${lectureId}`);
}

export function deleteStudentLoad(sloadId) {
  // console.log("deleteStudentLoad(sloadId)");
  return http.delete(`/studentload/remove/${sloadId}`);
}

export function getAllMyStudentLoads() {
  // console.log("getAllMyStudentLoads()");
  return http.get("/studentload/mystudentload/all");
}

export function getMyDesiredStudentLoads() {
  // console.log("getMyDesiredStudentLoads()");
  return http.get("/studentload/mystudentload/desired");
}

export function getMyEnrolledStudentLoads() {
  // console.log("getMyEnrolledStudentLoads()");
  return http.get("/studentload/mystudentload/enrolled");
}

export function getMyChildSchedule() {
  // console.log("getMyChildSchedule()");
  return http.get("/studentload/mychildschedule");
}

export function addClassToSched(lectureId) {
  // console.log("addClassToSched(lectureId)");
  return http.post(`/studentload/add/${lectureId}`);
}

export function getMyTempLoad() {
  // console.log("getMyTempLoad()");
  return http.get("/studentload/mystudentload/temp");
}

export function sendForApproval() {
  // console.log("sendForApproval()");
  return http.put("/studentload/sendforapproval");
}
