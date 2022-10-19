import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Grid, Input } from "@mui/material";

export const EnrolContext = createContext({
  searchTerm: [],
  handleTypeSearch: () => {},
  handleSearchForClass: () => {},
});

export const EnrolProvider = ({ children }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {}, []);
  const handleTypeSearch = () => {
    return (
      <Grid>
        <div align="center">
          <Input
            type="text"
            placeholder="Search Course..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => setSearchTerm("")}
          >
            Clear
          </Button>
        </div>
      </Grid>
    );
  };

  const handleSearchForClass = (courseCode) => {
    setSearchTerm(courseCode);
    navigate("/student/courses");
  };

  return (
    <EnrolContext.Provider
      value={{
        searchTerm: searchTerm,
        handleTypeSearch: handleTypeSearch,
        handleSearchForClass: handleSearchForClass,
      }}
    >
      {children}
    </EnrolContext.Provider>
  );
};
