import http from "./http";
import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  return http.get("/account/currentuser");
}

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

export function getUserById(id) {
  return http.get(`/account/${id}`);
}

export function getAccountId() {
  const accountId = http.get("/account/currentuser");

  console.log(accountId);
  return accountId;
}

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
