import http from "../http";

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
  Object.keys(course).forEach((key) => {
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
