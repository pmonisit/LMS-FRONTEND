import http from "../shared/http";

export function getCourseById(id) {
  // console.log("getCourseById(id)");
  return http.get(`/course/${id}`);
}

export function getCourse() {
  // console.log("getCourse()");
  return http.get("/course/all");
}

export function editCourse(id, course) {
  // console.log("editCourse(id, course)");
  return http.put(`/course/edit/${id}`, course);
}

export function addCourse(course) {
  // console.log("addCourse(course)");
  const courseClone = { ...course };
  Object.keys(course).forEach((key) => {
    if (
      course[key] === "" ||
      course[key] === null ||
      course[key] === "undefined"
    ) {
      delete courseClone[key];
    }
  });
  return http.post("/course/insert", courseClone);
}

export function getAllCoursesWithDegreeAndTimeSlot() {
  return http.get("/course/fetch/all");
}
