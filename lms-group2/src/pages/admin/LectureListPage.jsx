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
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { Box, Fab, InputAdornment, Typography } from "@mui/material";

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
  }, []);
  const fetchLecture = async () => {
    const res = await lectureService.getLecture();

    setTempList(res.data);
  };

  useEffect(() => {
    fetchLecture();
    fetchTempListObject();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
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

      let searchResult2 = [];
      tempListObject.map((lecture) => {
        searchResult.map((result) => {
          if (lecture.lectureId == result[0]) {
            searchResult2.push(lecture);
          }
        });
      });

      adminContext.onSetLectureList(searchResult2);
    } else {
      fetchBasicLecture();
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
              LECTURE LISTS
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
            <Fab color="primary" LinkComponent={Link} to="/admin/add-lecture">
              <AddIcon />
            </Fab>
          </Grid>

          {/* {isSearchSuccessful ? (
          <LectureListTable details={adminContext.lectureList} />
        ) : (
          <div>Search not found</div>
        )} */}
          <LectureListTable2 details={adminContext.lectureList} />
        </Grid>
      </Grid>
    </>
  );
};

export default LectureListPage;
