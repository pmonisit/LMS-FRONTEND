import http from "../shared/http";

export function getAttendance() {
  return http.get("/attendance/all");
}

export function deleteAttendance(id) {
  return http.delete(`/attendance/delete/${id}`);
}

export function addAttendance(attendance) {
  const attendanceClone = { ...attendance };
  Object.keys(attendance).forEach((key) => {
    if (
      attendance[key] === "" ||
      attendance[key] === null ||
      attendance[key] === "undefined"
    ) {
      delete attendanceClone[key];
    }
  });
  return http.post("/attendance/insert", attendanceClone);
}

export function getMyAttendancesByLectureId(lectureId) {
  return http.get(`/attendance/myattendance/all/lecture/${lectureId}`);
}

export function getAllMyAtttendancePerSem(semId) {
  return http.get(`/attendance/myattendance/all/${semId}`);
}

export function getAllAttendanceByLecture(lectureId, accountId) {
  return http.get(`/attendance/all/${lectureId}/${accountId}`);
}

export function parentGetAllMyAttendancesBySemesterId(semId) {
  return http.get(`/attendance/parent/child/all/${semId}`);
}
