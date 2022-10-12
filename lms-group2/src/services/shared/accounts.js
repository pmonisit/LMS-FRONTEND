import http from "./http";

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
  return accountId;
}

export function editUserPersonalInfo(id, userInfo) {
  return http.put(`/account/edit/${id}`, userInfo);
}

export function changePassword(password) {
  return http.put(`/account/changePW/`, password);
}

export function logout() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}
