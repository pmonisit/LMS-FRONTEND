import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api",
});

http.interceptors.request.use((request) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return request;
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error(error);
    alert("An unexpected error occurred");
  }
  return Promise.reject(error);
});

export default http;
