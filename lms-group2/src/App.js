// React
import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";

// Material Components
import { CssBaseline } from "@mui/material";
import Navbar from "./components/shared/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Banner from "./components/shared/Banner";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Pages
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import StudentHomePage from "./pages/student/StudentHomePage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import StudentEnrolmentPage from "./pages/student/StudentEnrolmentPage";
import TestPage from "./services/TestPage";

// Services
import * as accountService from "./services/shared/accounts";

// JWT Decode
import jwtDecode from "jwt-decode";

// Context
import { UserInterfaceContext } from "./context/shared/UserInterfaceContext";
import Footer from "./components/shared/Footer";
import Profile from "./components/shared/Profile";
import EditProfileInfo from "./components/shared/EditProfileInfo";

//EJ - Testing
import GenericForm from "./components/admin/account/GenericForm";
import AdminListPage from "./pages/admin/AdminListPage";
import StudentListPage from "./pages/admin/StudentListPage";
import ProfessorListPage from "./pages/admin/ProfessorListPage";
import ParentListPage from "./pages/admin/ParentListPage";
import EditUserPage from "./pages/admin/EditUserPage";
import UserDetails from "./components/admin/account/UserDetails";

const App = () => {
  const [accessToken, setAccessToken] = React.useState(
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar onLogout={handleLogout} />
        <Snackbar
          open={snackbarConfig.open}
          autoHideDuration={6000}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
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
            element={
              accessToken ? <StudentHomePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={accessToken ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile/edit/:id"
            element={
              accessToken ? <EditProfileInfo /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/enrolment"
            element={
              accessToken ? <StudentEnrolmentPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/testpage"
            element={accessToken ? <TestPage /> : <Navigate to="/login" />}
          />

          {/* {---------------------Admin Routes- Author: EJ-----------------------------------------------} */}

          <Route
            path="/admin/admin-list"
            element={accessToken ? <AdminListPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/student-list"
            element={
              accessToken ? <StudentListPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/professor-list"
            element={
              accessToken ? <ProfessorListPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/parent-list"
            element={
              accessToken ? <ParentListPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin/add-user"
            element={accessToken ? <GenericForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/user/:id/edit"
            element={accessToken ? <EditUserPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/user-details/:id"
            element={accessToken ? <UserDetails /> : <Navigate to="/login" />}
          />
        </Routes>

        <Footer />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
