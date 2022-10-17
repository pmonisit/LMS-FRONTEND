import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserInterfaceProvider } from "./context/shared/UserInterfaceContext";
import { AccountFormProvider } from "./context/admin/account/AccountFormContext";
import { EnrolProvider } from "./context/student/EnrolContext";
import { AttendanceProvider } from "./context/student/AttendanceContext";
import { ScheduleProvider } from "./context/student/ScheduleContext";
import { CurriculumProvider } from "./context/student/CurriculumContext";
import { GradeProvider } from "./context/student/GradeContext";
import { AdminProvider } from "./context/admin/account/adminContext";
import { ParentProvider } from "./context/parent/ParentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserInterfaceProvider>
        <AccountFormProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </AccountFormProvider>
      </UserInterfaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
