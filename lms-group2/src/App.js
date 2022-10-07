// React
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Material Components
import { CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Banner from "./components/Banner";

// Pages
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

// Services
import * as accountService from "./services/accounts";

// JWT Decode
import jwtDecode from "jwt-decode";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b71c1c",
    },
    secondary: {
      main: "#d32f2f",
    },
  },
});

const App = () => {
  const [accessToken, setAccessToken] = useState(
    accountService.getAccessToken()
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    accountService.logout();
    setAccessToken(null);
    navigate("/login");
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await accountService.loginUser(username, password);
      localStorage.setItem("accessToken", response.data.access_token);
      const decoded = jwtDecode(response.data.access_token);
      console.log(response.data.access_token);
      setAccessToken(response.data.access_token);
      console.log(accessToken);
      navigate("/");
    } catch (error) {
      alert("Error logging in");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route
          path="/login"
          element={
            accessToken ? (
              <Navigate to="/" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
