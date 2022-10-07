import http from "./http";
import jwtDecode from "jwt-decode";

// export function getCurrentUser() {

//   return http.get("/account/currentuser");
// }

export function registerAdmin(
  firstName,
  lastName,
  gender,
  birthdate,
  username
) {
  return http.post("/account/admin/register", {
    firstName,
    lastName,
    gender,
    birthdate,
    username,
  });
}

export function loginUser(username, password) {
  return http.post(`/login?username=${username}&password=${password}`);
}

export function setUserStatus(id, user) {
  return http.put(`/users/${id}`, user);
}

// export function getUserName() {
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) {
//     return null;
//   }
//   const decoded = jwtDecode(accessToken);
//   return decoded.firstName;
// }

// export function getUserStatus() {
//   const userStatus = localStorage.getItem("accessToken");
//   if (userStatus) {
//     const decoded = jwtDecode(userStatus);
//     return decoded;
//   }
// }

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
