import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserInterfaceProvider } from "./context/shared/UserInterfaceContext";
import { AccountFormProvider } from "./context/admin/account/AccountFormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserInterfaceProvider>
        <AccountFormProvider>
          <App />
        </AccountFormProvider>
      </UserInterfaceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
