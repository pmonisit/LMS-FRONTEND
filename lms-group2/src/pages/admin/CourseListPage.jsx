import React, { useContext, useEffect, useState } from "react";

import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/CourseService";
import CourseListTable from "../../components/admin/course/CourseListTable";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
const CourseListPage = () => {
  const adminContext = useContext(AdminContext);
  const [searchText, setSearchText] = useState("");
  const [tempList, setTempList] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  useEffect(() => {
    adminService.getCourse().then((res) => {
      adminContext.onSetCourseList(res.data);
    });
  }, []);

  useEffect(() => {
    adminService.getCourse().then((res) => {
      setTempList(res.data);
    });
  }, [adminContext.courseList]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);

    console.log(searchText);
  };
  const handleSearch = () => {
    if (searchText) {
      const filteredList = tempList.filter((item) => {
        try {
          if (
            item.courseCode.includes(searchText) ||
            item.courseName.includes(searchText)
          ) {
            setIsSearchSuccessful(true);
            return item;
          }
          //  else {
          //   setIsSearchSuccessful(false);
          // }
        } catch (error) {
          //alert("search not found");
        }
      });
      console.log([filteredList]);
      if (filteredList.length > 0) {
        adminContext.onSetCourseList(filteredList);
      } else {
        setIsSearchSuccessful(false);
      }
    } else {
      adminService.getCourse().then((res) => {
        adminContext.onSetCourseList(res.data);
      });
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
            to="/admin/add-course"
          >
            Add Course
          </Button>
        </Grid>

        {isSearchSuccessful ? (
          <CourseListTable details={adminContext.courseList} />
        ) : (
          <div>Search not found</div>
        )}
      </div>
    </>
  );
};

export default CourseListPage;
