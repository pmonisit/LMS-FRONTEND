import http from "../shared/http";

export function getTotalAdmin() {
  return http.get("/account/admin/size");
}

export function getTotalStudents() {
  return http.get("/account/student/size");
}

export function getTotalFaculty() {
  return http.get("/account/faculty/size");
}

export function getTotalParent() {
  return http.get("/account/parent/size");
}

export function getTotalDegree() {
  return http.get("/degree/size");
}

export function getTotalCourses() {
  return http.get("/course/size");
}
