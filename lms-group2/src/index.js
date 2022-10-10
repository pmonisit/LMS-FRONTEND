import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserInterfaceProvider } from "./context/shared/UserInterfaceContext";
import { AccountFormProvider } from "./context/admin/account/AccountFormContext";
import { EnrolProvider } from "./context/student/EnrolContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserInterfaceProvider>
        <EnrolProvider>
          <AccountFormProvider>
            <App />
          </AccountFormProvider>
        </EnrolProvider>
      </UserInterfaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
