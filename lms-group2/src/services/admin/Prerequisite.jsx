import http from "../http";

export function getPrerequisiteById(id) {
  return http.get(`/prerequisite/${id}`);
}

export function getPrerequisite() {
  return http.get("/prerequisite/all");
}

export function deletePrerequisite(id) {
  return http.delete(`/prerequisite/delete/${id}`);
}

export function editPrerequisite(id) {
  return http.put(`/prerequisite/edit/${id}`);
}

export function addPrerequisite(prerequisite) {
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