import http from "../shared/http";

export function getPrerequisiteById(id) {
  // console.log("getPrerequisiteById(id)");
  return http.get(`/prerequisite/${id}`);
}

export function getPrerequisite() {
  // console.log("getPrerequisite()");
  return http.get("/prerequisite/all");
}

export function deletePrerequisite(id) {
  // console.log("deletePrerequisite(id)");
  return http.delete(`/prerequisite/delete/${id}`);
}

export function editPrerequisite(id, prerequisite) {
  // console.log("editPrerequisite(id, prerequisite)");
  return http.put(`/prerequisite/edit/${id}`, prerequisite);
}

export function addPrerequisite(prerequisite) {
  // console.log("addPrerequisite(prerequisite)");
  const prerequisiteClone = { ...prerequisite };
  Object.keys(prerequisite).forEach((key) => {
    if (
      prerequisite[key] === "" ||
      prerequisite[key] === null ||
      prerequisite[key] === "undefined"
    ) {
      delete prerequisiteClone[key];
    }
  });
  return http.post("/prerequisite/insert", prerequisiteClone);
}

export function getPrereqOfCourse(id) {
  // console.log("getPrereqOfCourse(id)");
  return http.get(`/prerequisite/getprereq/${id}`);
}

export function getPrerequisiteInfo() {
  return http.get("/prerequisite/all/info");
}
