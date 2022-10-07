// React
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";

// Material Components
import { CssBaseline } from "@mui/material";
import Navbar from "./components/shared/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Banner from "./components/shared/Banner";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

// Pages
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import StudentHomePage from "./pages/student/StudentHomePage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import StudentEnrolmentPage from "./pages/student/StudentEnrolmentPage";

// Services
import * as accountService from "./services/accounts";

// JWT Decode
import jwtDecode from "jwt-decode";

// Context
import { UserInterfaceContext } from "./context/shared/UserInterfaceContext";
import Footer from "./components/shared/Footer";
import Profile from "./components/shared/Profile";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    accountService.getAccessToken()
  );

  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const { isDarkMode, snackbarConfig, onCloseSnackbar } =
    useContext(UserInterfaceContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#b71c1c",
      },
      secondary: {
        main: "#d32f2f",
      },
      mode: isDarkMode ? "dark" : "light",
    },
  });

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
      // onOpenSnackbar({
      //   open: true,
      //   severity: "success",
      //   message: "Login successful!",
      // });
      navigate("/");
    } catch (error) {
      // onOpenSnackbar({
      //   open: true,
      //   severity: "error",
      //   message: "Username or Password is incorrect. Please try again.",
      // });
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onLogout={handleLogout} />
      <Snackbar
        open={snackbarConfig.open}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={onCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={onCloseSnackbar}
          severity={snackbarConfig.severity}
          sx={{ width: "100%" }}
        >
          {snackbarConfig.message}
        </MuiAlert>
      </Snackbar>
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
        <Route
          path="/home"
          element={accessToken ? <StudentHomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={accessToken ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/enrolment"
          element={
            accessToken ? <StudentEnrolmentPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
