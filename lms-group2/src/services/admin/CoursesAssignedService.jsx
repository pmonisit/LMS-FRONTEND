import http from "../shared/http";

export function getCourseAssignedById(id) {
  return http.get(`/courseassigned/${id}`);
}

export function getCourseAssigned() {
  return http.get("/courseassigned/all");
}

export function editCourseAssigned(id) {
  return http.put(`/courseassigned/edit/${id}`);
}

export function addCourseAssigned(courseAssigned) {
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
  return http.get("/courseassigned/mycourses");
}

export function getMyRecommendedCourses() {
  return http.get("/courseassigned/mycourses/recommended");
}
