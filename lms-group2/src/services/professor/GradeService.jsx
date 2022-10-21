import http from "../shared/http";

export function editGrade(id, grade) {
  // console.log("editGrade(id, grade)");
  return http.put(`/grade/update/${id}`, grade);
}

export function getStudentGradePerLecture(studentId, lectureId) {
  // console.log("getStudentGradePerLecture(studentId, lectureId)");
  return http.get(`/grade/student/${studentId}/${lectureId}`);
}

export function markGradeAsFinal(gradeId) {
  // console.log("markGradeAsFinal(gradeId)");
  return http.put(`/grade/markasfinal/${gradeId}`);
}

export function getMyGradesBySemId(semesterId) {
  // console.log("getMyGradesBySemId(semesterId)");
  return http.get(`/grade/student/${semesterId}`);
}

export function getChildGradesBySem(semesterId) {
  // console.log("getChildGradesBySem(semesterId)");
  return http.get(`/grade/mychild/${semesterId}`);
}
