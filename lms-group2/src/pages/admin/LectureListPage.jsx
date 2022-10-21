import React, { useContext, useEffect, useState } from "react";

import { AdminContext } from "../../context/admin/account/adminContext";
import * as lectureService from "../../services/professor/LectureService";
import LectureListTable from "../../components/admin/lecture/LectureListTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LectureListTable2 from "../../components/admin/lecture/LectureListTable2";

const LectureListPage = () => {
  const adminContext = useContext(AdminContext);
  const [searchText, setSearchText] = useState("");
  const [tempList, setTempList] = useState([]);
  const [tempListObject, setTempListObject] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  const [isLecture, setIsLecture] = useState(false);

  const fetchBasicLecture = async () => {
    const res = await lectureService.getAllBasicLectures().then((res) => {
      adminContext.onSetLectureList(res.data);
    });
  };
  const fetchTempListObject = async () => {
    const res = await lectureService.getAllBasicLectures().then((res) => {
      setTempListObject(res.data);
    });
  };

  useEffect(() => {
    fetchBasicLecture();
    // lectureService.getAllBasicLectures().then((res) => {
    //   adminContext.onSetLectureList(res.data);
    // });
  }, []);
  const fetchLecture = async () => {
    const res = await lectureService.getLecture();
    console.log(res.data);
    setTempList(res.data);
  };

  useEffect(() => {
    fetchLecture();
    fetchTempListObject();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);

    console.log(searchText);
  };

  const handleSearch = () => {
    if (searchText) {
      const searchResult = tempList.filter((data) => {
        if (
          data[3].includes(searchText) ||
          data[3].includes(searchText) ||
          data[4].includes(searchText) ||
          data[5].includes(searchText)
        ) {
          return data[0];
        }
      });
      console.log(searchResult[0]);
      console.log(adminContext.lectureList);
      let searchResult2 = [];
      tempListObject.map((lecture) => {
        searchResult.map((result) => {
          if (lecture.lectureId == result[0]) {
            searchResult2.push(lecture);
          }
        });
      });
      console.log(searchResult2);
      adminContext.onSetLectureList(searchResult2);
    } else {
      fetchBasicLecture();
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

        {/* {isSearchSuccessful ? (
          <LectureListTable details={adminContext.lectureList} />
        ) : (
          <div>Search not found</div>
        )} */}
        <LectureListTable2 details={adminContext.lectureList} />
      </div>
    </>
  );
};

export default LectureListPage;
