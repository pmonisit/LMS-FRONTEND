import http from "../shared/http";

export function getTimeslotById(id) {
  return http.get(`/timeslot/${id}`);
}

export function getTimeslot() {
  return http.get("/timeslot/all");
}

export function editTimeslot(id, timeslot) {
  return http.put(`/timeslot/edit/${id}`, timeslot);
}

export function addTimeslot(timeslot) {
  const timeslotClone = { ...timeslot };
  Object.keys(timeslot).forEach((key) => {
    if (
      timeslot[key] === "" ||
      timeslot[key] === null ||
      timeslot[key] === "undefined"
    ) {
      delete timeslotClone[key];
    }
  });
  return http.post("/timeslot/insert", timeslot);
}
