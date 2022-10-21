import React, { useContext, useEffect, useState } from "react";

import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/CourseService";
import CourseListTable from "../../components/admin/course/CourseListTable";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";
import { Box, Fab, InputAdornment, Typography } from "@mui/material";

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
      <Grid container mt={7}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Box display={{ xs: "none", md: "block" }}>
            <AdminSidebar />
          </Box>
          <Box display={{ sm: "none" }}>
            <LinkMenu />
          </Box>
        </Grid>
        <Grid
          item
          xs={11}
          sm={10}
          md={8}
          lg={8}
          xl={8}
          margin={2}
          marginBottom={10}
        >
          <Grid item xs={12} lg={12} marginBottom={5}>
            <Typography
              textAlign="center"
              color="#b71c1c"
              variant="h5"
              marginTop={4}
            >
              COURSE LISTS
            </Typography>
          </Grid>

          <Grid container justifyContent="start" spacing={2}>
            <Grid item xs={12} md={8} marginBottom={2}>
              <TextField
                label="Search"
                variant="standard"
                value={searchText}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ContentPasteSearchIcon
                        onClick={handleSearch}
                        cursor="pointer"
                        mr={5}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="end" spacing={2} marginBottom={2}>
            <Fab color="primary" LinkComponent={Link} to="/admin/add-course">
              <AddIcon />
            </Fab>
          </Grid>

          {isSearchSuccessful ? (
            <CourseListTable details={adminContext.courseList} />
          ) : (
            <div>Search not found</div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CourseListPage;
