import http from "../shared/http";

export function getLectureById(id) {
  // console.log("getLectureById(id)");
  return http.get(`/lecture/${id}`);
}

export function getLecture() {
  // console.log("getLecture()");
  return http.get("/lecture/all");
}

export function getProfLoad() {
  // console.log("getProfLoad()");
  return http.get("/lecture/myprofload/all");
}

export function getStudentsPerLecture(lectureId) {
  // console.log("getStudentsPerLecture(lectureId)");
  return http.get(`studentload/students/enrolled/${lectureId}`);
}

export function editLecture(id, lecture) {
  // console.log("editLecture(id, lecture)");
  return http.put(`/lecture/edit/${id}`, lecture);
}

export function addLecture(lecture) {
  // console.log("addLecture(lecture)");
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
  return http.post("/lecture/insert", lectureClone);
}

export function getAllLecturesBySemID(semesterId) {
  // console.log("getAllLecturesBySemID(semesterId)");
  return http.get(`/lecture/all/semester/${semesterId}`);
}

export function searchLecture(lecture) {
  // console.log("searchLecture(lecture)");
  return http.get(`/lecture/search/${lecture}`);
}

export function assignProfessor(lectureId, accountId) {
  // console.log("assignProfessor(lectureId, accountId)");
  return http.put(`lecture/edit/${lectureId}/changeprof/ ${accountId}`);
}
export function getAllMyAtttendancePerLecture(lectureId) {
  // console.log("getAllMyAtttendancePerLecture(lectureId)");
  return http.get(`/lecture/myattendance/all/lecture/${lectureId}`);
}

export function getLecturesByDegree(degreeId) {
  // console.log("getLecturesByDegree(degreeId)");
  return http.get(`/lecture/all/currentsem/degree/${degreeId}`);
}

export function getAllBasicLectures() {
  // console.log("getAllBasicLectures()");
  return http.get("/lecture/fetch/all");
}

export function getAllLecturesByCurrentSem() {
  // console.log("getAllLecturesByCurrentSem()");
  return http.get("/lecture/all/currentsem");
}
