import http from "../http";

export function getAttendanceById(id) {
  return http.get(`/attendance/${id}`);
}

export function getAttendance() {
  return http.get("/attendance/all");
}

export function deleteAttendance(id) {
  return http.delete(`/attendance/delete/${id}`);
}

export function editAttendance(id) {
  return http.put(`/attendance/edit/${id}`);
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
