import http from "./http";
import jwtDecode from "jwt-decode";

export function getRole() {
  // console.log("getRole()");
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return null;
  }
  const decoded = jwtDecode(accessToken);
  return decoded.roles[0];
}

export function getCurrentUser() {
  // console.log("getCurrentUser()");
  return http.get("/account/currentuser");
}

export function registerAdmin(
  firstName,
  lastName,
  gender,
  birthdate,
  username
) {
  // console.log("registerAdmin");
  return http.post("/account/admin/register", {
    firstName,
    lastName,
    gender,
    birthdate,
    username,
  });
}

export function loginUser(username, password) {
  // console.log("loginUser(username, password)");
  return http.post(`/login?username=${username}&password=${password}`);
}

export function getUserById(id) {
  // console.log("getUserById(id)");
  return http.get(`/account/${id}`);
}

export function getAccountId() {
  // console.log("getAccountId()");
  const accountId = http.get("/account/currentuser");
  return accountId;
}

export function editUserPersonalInfo(id, userInfo) {
  // console.log("editUserPersonalInfo(id, userInfo)");
  return http.put(`/account/edit/${id}`, userInfo);
}

export function changePassword(password) {
  // console.log("changePassword(password)");
  return http.put(`/account/changePW/`, password);
}

export function logout() {
  // console.log("logout()");
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  // console.log("getAccessToken()");
  return localStorage.getItem("accessToken");
}
