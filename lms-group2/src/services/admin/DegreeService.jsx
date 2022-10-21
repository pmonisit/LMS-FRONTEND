import http from "../shared/http";

export function getDegreeById(id) {
  // console.log("getDegreeById(id)");
  return http.get(`/degree/${id}`);
}

export function getDegree() {
  // console.log("getDegree()");
  return http.get("/degree/all");
}

export function editDegree(id, degree) {
  // console.log("editDegree(id, degree)");
  return http.put(`/degree/edit/${id}`, degree);
}

export function addDegree(degree) {
  // console.log("addDegree(degree)");
  const degreeClone = { ...degree };
  Object.keys(degree).forEach((key) => {
    if (
      degree[key] === "" ||
      degree[key] === null ||
      degree[key] === "undefined"
    ) {
      delete degreeClone[key];
    }
  });
  return http.post("/degree/insert", degreeClone);
}
