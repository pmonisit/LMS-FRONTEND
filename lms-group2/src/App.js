// React
import * as React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

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
import StudentEnrolmentPage from "./pages/student/StudentEnrolmentPage";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";
import CoursesPage from "./pages/student/CoursesPage";
import StudentGradePage from "./pages/student/StudentGradePage";
import StudentAttendancePage from "./pages/student/StudentAttendancePage";
import StudentCurriculumPage from "./pages/student/StudentCurriculumPage";
import StudentSchedulePage from "./pages/student/StudentSchedulePage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import AttendanceList from "./components/student/AttendanceList";
import ParentChildAttendanceList from "./components/parent/ParentChildAttendanceList";
import ProfessorDashboardPage from "./pages/professor/ProfessorDashboardPage";

import ParentDashboardPage from "./pages/parent/ParentDashboardPage";
import ParentProfilePage from "./pages/parent/ParentProfilePage";
import ParentChildGradePage from "./pages/parent/ParentChildGradePage";
import ParentChildAttendancePage from "./pages/parent/ParentChildAttendancePage";
import ParentChildSchedulePage from "./pages/parent/ParentChildSchedulePage";
import ParentChildCurriculumPage from "./pages/parent/ParentChildCurriculumPage";

// Services
import * as accountService from "./services/shared/accounts";

// Context
import { UserInterfaceContext } from "./context/shared/UserInterfaceContext";
import Footer from "./components/shared/Footer";
import Profile from "./components/shared/Profile";
import EditProfileInfo from "./components/shared/EditProfileInfo";

//-----------Admin Imports--------------------------
import GenericForm from "./components/admin/account/GenericForm";
import AdminListPage from "./pages/admin/AdminListPage";
import StudentListPage from "./pages/admin/StudentListPage";
import ProfessorListPage from "./pages/admin/ProfessorListPage";
import ParentListPage from "./pages/admin/ParentListPage";
import EditUserPage from "./pages/admin/EditUserPage";
import UserDetails from "./components/admin/account/UserDetails";
import ListOfStudentsPage from "./pages/professor/ListOfStudentsPage";
import EditDegreePage from "./pages/admin/EditDegreePage";
import EditCoursePage from "./pages/admin/EditCoursePage";
import DegreeForm from "./components/admin/degree/DegreeForm";
import CourseForm from "./components/admin/course/CourseForm";
import DegreeListPage from "./pages/admin/DegreeListPage";
import CourseListPage from "./pages/admin/CourseListPage";
import EditLecturePage from "./pages/admin/EditLecturePage";
import LectureDetails from "./components/admin/lecture/LectureDetails";
import LectureFormHolder from "./components/admin/lecture/LectureFormHolder";
import LectureListPage from "./pages/admin/LectureListPage";
import PrerequisiteForm2 from "./components/admin/prerequisite/PrerequisiteForm2";
import PrerequisiteListPage from "./pages/admin/PrerequisiteListPage";
import EditPrerequisitePage from "./pages/admin/EditPrerequisitePage";
import SemesterListPage from "./pages/admin/SemesterListPage";
import SemesterForm from "./components/admin/semester/SemesterForm";
import EditSemesterPage from "./pages/admin/EditSemesterPage";
import TimeslotForm from "./components/admin/timeslot/TimeslotForm";
import TimeslotListPage from "./pages/admin/TimeslotListPage";
import EditTimeslotPage from "./pages/admin/EditTimeslotPage";
import AddProfessorForm from "./components/admin/account/AddProfessorForm";
import SchedulePage from "./pages/admin/SchedulePage";
//------------End of Admin Imports
import ChangePassword from "./components/shared/ChangePassword";
import AddGradePerStudent from "./components/professor/AddGradePerStudent";
import CheckAttendancePage from "./pages/professor/CheckAttendancePage";

// JWT Decode
import decode from "jwt-decode";
import ManualAttendancePage from "./pages/professor/ManualAttendancePage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import EditAttendanceComponent from "./components/professor/EditAttendanceComponent";

const App = () => {
  const [accessToken, setAccessToken] = React.useState(
    accountService.getAccessToken()
  );
  const [role, setRole] = React.useState(accountService.getRole());

  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
  const { isDarkMode, snackbarConfig, onCloseSnackbar } =
    useContext(UserInterfaceContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const date = new Date();

    if (token) {
      const decodedToken = decode(token);
      if (new Date(decodedToken.exp * 1000).getTime() <= date.getTime()) {
        handleLogout();
      }
    }
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

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
    window.location.reload();
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await accountService.loginUser(username, password);
      localStorage.setItem("accessToken", response.data.access_token);
      setAccessToken(response.data.access_token);
      window.location.reload();
      console.log(response.data);
      navigate("/");
    } catch (error) {
      onOpenSnackbar({
        open: true,
        severity: "error",
        message: "Username or Password is incorrect. Please try again.",
      });
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
            path="/profile/changePassword/:id"
            element={
              accessToken ? <ChangePassword /> : <Navigate to="/login" />
            }
          />
          {/* {---------------------Start Faculty Routes- Author: Prince-----------------------------------------------} */}
          <Route
            path="/professor/dashboard/:id"
            element={
              accessToken && role === "professor" ? (
                <ProfessorDashboardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/professor/dashboard/addGrade/:studentId/:id"
            element={
              accessToken && role === "professor" ? (
                <AddGradePerStudent />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/professor/dashboard/studentLists/:id"
            element={
              accessToken && role === "professor" ? (
                <ListOfStudentsPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/professor/dashboard/checkAttendance/:studentId/:lectureId"
            element={
              accessToken && role === "professor" ? (
                <CheckAttendancePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/professor/dashboard/editAttendance/:id"
            element={
              accessToken && role === "professor" ? (
                <EditAttendanceComponent />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/professor/dashboard/manualAttendance/:lectureId/:studentId"
            element={
              accessToken && role === "professor" ? (
                <ManualAttendancePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* {---------------------End Faculty Routes- Author: Prince-----------------------------------------------} */}
          {/* {---------------------Admin Routes- Author: EJ-----------------------------------------------} */}

          <Route
            path="/admin/dashboard"
            element={
              accessToken && role === "admin" ? (
                <AdminDashboardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/*-----------Users------------ */}
          <Route
            path="/admin/admin-list"
            element={
              accessToken && role === "admin" ? (
                <AdminListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/student-list"
            element={
              accessToken && role === "admin" ? (
                <StudentListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/professor-list"
            element={
              accessToken && role === "admin" ? (
                <ProfessorListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/parent-list"
            element={
              accessToken && role === "admin" ? (
                <ParentListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/add-user"
            element={
              accessToken && role === "admin" ? (
                <GenericForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/user/:id/edit"
            element={
              accessToken && role === "admin" ? (
                <EditUserPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/user-details/:id"
            element={
              accessToken && role === "admin" ? (
                <UserDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/user-details/:id"
            element={
              accessToken && role === "admin" ? (
                <UserDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/*-----------Degree------------ */}
          <Route
            path="/admin/add-degree"
            element={
              accessToken && role === "admin" ? (
                <DegreeForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/degree-list"
            element={
              accessToken && role === "admin" ? (
                <DegreeListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/degree/:id/edit"
            element={
              accessToken && role === "admin" ? (
                <EditDegreePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/degree/:degreeId/schedule"
            element={accessToken ? <SchedulePage /> : <Navigate to="/login" />}
          />
          {/*-----------Course------------ */}
          <Route
            path="/admin/add-course"
            element={
              accessToken && role === "admin" ? (
                <CourseForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/course-list"
            element={
              accessToken && role === "admin" ? (
                <CourseListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/course/:id/edit"
            element={
              accessToken && role === "admin" ? (
                <EditCoursePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/*-----------Lecture------------ */}
          <Route
            path="/admin/add-lecture"
            element={
              accessToken && role === "admin" ? (
                <LectureFormHolder />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/lecture-list"
            element={
              accessToken && role === "admin" ? (
                <LectureListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/lecture/:id/edit"
            element={
              accessToken && role === "admin" ? (
                <EditLecturePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/lecture-details/:id"
            element={
              accessToken && role === "admin" ? (
                <LectureDetails />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/assign-lecture/:id"
            element={
              accessToken && role === "admin" ? (
                <LectureFormHolder />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/lecture/:id/add-professor"
            element={
              accessToken && role === "admin" ? (
                <AddProfessorForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/*-----------Prerequisite------------ */}
          <Route
            path="/admin/add-prerequisite/:id"
            element={
              accessToken && role === "admin" ? (
                <PrerequisiteForm2 />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/prerequisite-list"
            element={
              accessToken && role === "admin" ? (
                <PrerequisiteListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/prerequisite/:id/edit"
            element={
              accessToken && role === "admin" ? (
                <EditPrerequisitePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/*-----------Semester------------ */}
          <Route
            path="/admin/add-semester"
            element={
              accessToken && role === "admin" ? (
                <SemesterForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/semester-list"
            element={
              accessToken && role === "admin" ? (
                <SemesterListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/semester/:id/edit"
            element={
              accessToken && role === "admin" ? (
                <EditSemesterPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/*-----------Timeslot------------ */}
          <Route
            path="/admin/add-timeslot"
            element={
              accessToken && role === "admin" ? (
                <TimeslotForm />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/timeslot-list"
            element={
              accessToken && role === "admin" ? (
                <TimeslotListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/timeslot/:id/edit"
            element={
              accessToken && role === "admin" ? (
                <EditTimeslotPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* {---------------------End of Admin Routes- Author: EJ-----------------------------------------------} */}
          {/* {---------------------Students Routes- Author: Ja-----------------------------------------------} */}
          <Route
            path="/student/dashboard"
            element={
              accessToken && role === "student" ? (
                <StudentDashboardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/profile"
            element={
              accessToken && role === "student" ? (
                <StudentProfilePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/profile/edit/:id"
            element={
              accessToken && role === "student" ? (
                <EditProfileInfo />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/profile/changePassword/:id"
            element={
              accessToken && role === "student" ? (
                <ChangePassword />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/enrolment"
            element={
              accessToken && role === "student" ? (
                <StudentEnrolmentPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/courses"
            element={
              accessToken && role === "student" ? (
                <CoursesPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/grades"
            element={
              accessToken && role === "student" ? (
                <StudentGradePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/attendance"
            element={
              accessToken && role === "student" ? (
                <StudentAttendancePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/attendance/viewlist"
            element={
              accessToken && role === "student" ? (
                <AttendanceList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/curriculum"
            element={
              accessToken && role === "student" ? (
                <StudentCurriculumPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/student/schedule"
            element={
              accessToken && role === "student" ? (
                <StudentSchedulePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* {---------------------Parents Routes- Author: Ja-----------------------------------------------} */}
          <Route
            path="/parent/dashboard"
            element={
              accessToken && role === "parent" ? (
                <ParentDashboardPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/parent/profile/edit/:id"
            element={
              accessToken && role === "parent" ? (
                <EditProfileInfo />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/parent/profile/changePassword/:id"
            element={
              accessToken && role === "parent" ? (
                <ChangePassword />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/parent/child/grades"
            element={
              accessToken && role === "parent" ? (
                <ParentChildGradePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/parent/child/attendance"
            element={
              accessToken && role === "parent" ? (
                <ParentChildAttendancePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/parent/child/attendance/viewlist"
            element={
              accessToken && role === "parent" ? (
                <ParentChildAttendanceList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/parent/child/curriculum"
            element={
              accessToken && role === "parent" ? (
                <ParentChildCurriculumPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/parent/child/schedule"
            element={
              accessToken && role === "parent" ? (
                <ParentChildSchedulePage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
