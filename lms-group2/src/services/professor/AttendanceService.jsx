import http from "../shared/http";

export function getAttendance() {
  // console.log("getAttendance()");
  return http.get("/attendance/all");
}

export function deleteAttendance(id) {
  // console.log("deleteAttendance(id)");
  return http.delete(`/attendance/delete/${id}`);
}

// export function addAttendance(attendance) {
//   const attendanceClone = { ...attendance };
//   Object.keys(attendance).forEach((key) => {
//     if (
//       attendance[key] === "" ||
//       attendance[key] === null ||
//       attendance[key] === "undefined"
//     ) {
//       delete attendanceClone[key];
//     }
//   });
//   return http.post("/attendance/insert", attendanceClone);
// }

export function getMyAttendancesByLectureId(lectureId) {
  // console.log("getMyAttendancesByLectureId(lectureId)");
  return http.get(`/attendance/myattendance/all/lecture/${lectureId}`);
}

export function getAllMyAtttendancePerSem(semId) {
  // console.log("getAllMyAtttendancePerSem(semId)");
  return http.get(`/attendance/myattendance/all/${semId}`);
}

export function getAllAttendanceByLecture(lectureId, accountId) {
  // console.log("getAllAttendanceByLecture(lectureId, accountId)");
  return http.get(`/attendance/all/${lectureId}/${accountId}`);
}

export function parentGetAllMyAttendancesBySemesterId(semId) {
  // console.log("parentGetAllMyAttendancesBySemesterId(semId)");
  return http.get(`/attendance/parent/child/all/${semId}`);
}

export function markAsPresent(lectureId, accountId) {
  // console.log("markAsPresent(lectureId, accountId)");
  return http.post(`/attendance/present/${lectureId}/${accountId}`);
}

export function markAsLate(lectureId, accountId) {
  // console.log("markAsLate(lectureId, accountId)");
  return http.post(`/attendance/late/${lectureId}/${accountId}`);
}

export function markAsAbsent(lectureId, accountId) {
  // console.log("markAsAbsent(lectureId, accountId)");
  return http.post(`/attendance/absent/${lectureId}/${accountId}`);
}

export function editAttendance(attendanceId, form) {
  // console.log("editAttendance(attendanceId, form)");
  return http.put(`/attendance/edit/${attendanceId}`, form);
}

export function getAttendanceById(attendanceId) {
  // console.log("getAttendanceById(attendanceId)");
  return http.get(`/attendance/${attendanceId}`);
}

export function addManualAttendance(lectureId, studentId, form) {
  // console.log("addManualAttendance(lectureId, studentId, form)");
  return http.post(`/attendance/insert/${lectureId}/${studentId}`, form);
}
