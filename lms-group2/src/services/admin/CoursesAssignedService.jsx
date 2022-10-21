import http from "../shared/http";

export function getCourseAssignedById(id) {
  // console.log("getCourseAssignedById(id)");
  return http.get(`/courseassigned/${id}`);
}

export function getCourseAssigned() {
  // console.log("getCourseAssigned()");
  return http.get("/courseassigned/all");
}

export function editCourseAssigned(id) {
  // console.log("editCourseAssigned(id)");
  return http.put(`/courseassigned/edit/${id}`);
}

export function addCourseAssigned(courseAssigned) {
  // console.log("addCourseAssigned(courseAssigned)");
  const courseAssignedClone = { ...courseAssigned };
  Object.keys(courseAssigned).forEach((key) => {
    if (
      courseAssigned[key] === "" ||
      courseAssigned[key] === null ||
      courseAssigned[key] === "undefined"
    ) {
      delete courseAssignedClone[key];
    }
  });
  return http.post("/courseassigned/insert", courseAssignedClone);
}

export function getMyCourses() {
  // console.log("getMyCourses()");
  return http.get("/courseassigned/mycourses");
}

export function getMyRecommendedCourses() {
  // console.log("getMyRecommendedCourses()");
  return http.get("/courseassigned/mycourses/recommended");
}

export function getMyCoursesParent() {
  // console.log("getMyCoursesParent()");
  return http.get("/courseassigned/parent/mycourses");
}
