import http from "../shared/http";

export function getLectureById(id) {
  return http.get(`/lecture/${id}`);
}

export function getLecture() {
  return http.get("/lecture/all");
}

export function getProfLoad() {
  return http.get("/lecture/myprofload/all");
}

export function editLecture(id) {
  return http.put(`/lecture/edit/${id}`);
}

export function addLecture(lecture) {
  const lectureClone = { ...lecture };
  Object.keys(lecture).forEach((key) => {
    if (
      lecture[key] === "" ||
      lecture[key] === null ||
      lecture[key] === "undefined"
    ) {
      delete lectureClone[key];
    }
  });
  return http.post("/course/insert", lectureClone);
}
