import http from "../shared/http";

export function getTimeslotById(id) {
  // console.log("getTimeslotById(id)");
  return http.get(`/timeslot/${id}`);
}

export function getTimeslot() {
  // console.log("getTimeslot()");
  return http.get("/timeslot/all");
}

export function editTimeslot(id, timeslot) {
  // console.log("editTimeslot(id, timeslot)");
  return http.put(`/timeslot/edit/${id}`, timeslot);
}

export function addTimeslot(timeslot) {
  // console.log("addTimeslot(timeslot)");
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
