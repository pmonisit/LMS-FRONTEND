import http from "../shared/http";

export function getCourseById(id) {
  return http.get(`/course/${id}`);
}

export function getCourse() {
  return http.get("/course/all");
}

export function editCourse(id, course) {
  return http.put(`/course/edit/${id}`, course);
}

export function addCourse(course) {
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
