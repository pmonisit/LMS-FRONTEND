import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserInterfaceProvider } from "./context/shared/UserInterfaceContext";
import { AccountFormProvider } from "./context/admin/account/AccountFormContext";
import { EnrolProvider } from "./context/student/EnrolContext";
import { AdminProvider } from "./context/admin/account/adminContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserInterfaceProvider>
        <AccountFormProvider>
          <EnrolProvider>
            <AdminProvider>
              <App />
            </AdminProvider>
          </EnrolProvider>
        </AccountFormProvider>
      </UserInterfaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
