import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserInterfaceProvider } from "./context/shared/UserInterfaceContext";
import { AccountFormProvider } from "./context/admin/account/AccountFormContext";
import { AdminProvider } from "./context/admin/account/adminContext";
import { ParentProvider } from "./context/parent/ParentContext";
import { EnrolProvider } from "./context/student/EnrolContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserInterfaceProvider>
        <AccountFormProvider>
          <AdminProvider>
            <EnrolProvider>
              <App />
            </EnrolProvider>
          </AdminProvider>
        </AccountFormProvider>
      </UserInterfaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
