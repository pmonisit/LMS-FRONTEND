import http from "../http";

export function getDegreeById(id) {
  return http.get(`/degree/${id}`);
}

export function getDegree() {
  return http.get("/degree/all");
}

export function editDegree(id) {
  return http.put(`/degree/edit/${id}`);
}

export function addDegree(degree) {
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
