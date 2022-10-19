import React, { useContext, useEffect, useState } from "react";

import { AdminContext } from "../../context/admin/account/adminContext";
import * as lectureService from "../../services/professor/LectureService";
import LectureListTable from "../../components/admin/lecture/LectureListTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const LectureListPage = () => {
  const adminContext = useContext(AdminContext);
  const [searchText, setSearchText] = useState("");
  const [tempList, setTempList] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);

  useEffect(() => {
    lectureService.getLecture().then((res) => {
      // console.log(res.data);
      adminContext.onSetLectureList(res.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);

    console.log(searchText);
  };

  const handleSearch = () => {
    if (searchText) {
      lectureService
        .searchLecture(searchText)
        .then((res) => adminContext.onSetLectureList(res.data));
    } else {
      lectureService
        .getLecture()
        .then((res) => adminContext.onSetLectureList(res.data));
    }
  };
  return (
    <>
      <div style={{ marginTop: "80px" }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6} sm={6}>
            <TextField
              label="Search"
              variant="standard"
              value={searchText}
              onChange={handleSearchChange}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Grid>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            LinkComponent={Link}
            to="/admin/add-lecture"
          >
            Add Lecture
          </Button>
        </Grid>

        {isSearchSuccessful ? (
          <LectureListTable details={adminContext.lectureList} />
        ) : (
          <div>Search not found</div>
        )}
      </div>
    </>
  );
};

export default LectureListPage;
