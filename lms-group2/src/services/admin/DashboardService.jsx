import http from "../shared/http";

export function getTotalAdmin() {
  // console.log("getTotalAdmin()");
  return http.get("/account/admin/size");
}

export function getTotalStudents() {
  // console.log("getTotalStudents()");
  return http.get("/account/student/size");
}

export function getTotalFaculty() {
  // console.log("getTotalFaculty()");
  return http.get("/account/faculty/size");
}

export function getTotalParent() {
  // console.log("getTotalParent()");
  return http.get("/account/parent/size");
}

export function getTotalDegree() {
  // console.log("getTotalDegree()");
  return http.get("/degree/size");
}

export function getTotalCourses() {
  // console.log("getTotalCourses()");
  return http.get("/course/size");
}
