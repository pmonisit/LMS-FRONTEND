import { createContext, useState } from "react";

export const UserInterfaceContext = createContext({
  isDarkMode: false,
  snackbarConfig: null,
  toggleDarkMode: () => {},
  onOpenSnackbar: () => {},
  onCloseSnackbar: () => {},
});

export const UserInterfaceProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("isDarkMode") === "true"
  );
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleOpenSnackbar = (snackbarConfig) => {
    setSnackbarConfig({
      open: true,
      severity: snackbarConfig.severity,
      message: snackbarConfig.message,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarConfig({
      open: false,
      // severity: "",
      // message: "",
    });
  };

  const toggleDarkMode = () => {
    localStorage.setItem("isDarkMode", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <UserInterfaceContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        onOpenSnackbar: handleOpenSnackbar,
        onCloseSnackbar: handleCloseSnackbar,
        snackbarConfig,
      }}
    >
      {children}
    </UserInterfaceContext.Provider>
  );
};
