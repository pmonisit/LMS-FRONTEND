import http from "../shared/http";

export function editGrade(id, grade) {
  return http.put(`/grade/update/${id}`, grade);
}

export function getStudentGradePerLecture(studentId, lectureId) {
  return http.get(`/grade/student/${studentId}/${lectureId}`);
}
