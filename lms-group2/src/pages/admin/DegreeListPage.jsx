import React, { useContext, useEffect, useState } from "react";
import DegreeListTable2 from "../../components/admin/degree/DegreeListTable2";
import { AdminContext } from "../../context/admin/account/adminContext";
import * as adminService from "../../services/admin/DegreeService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
const DegreeListPage = () => {
  const adminContext = useContext(AdminContext);
  const [searchText, setSearchText] = useState("");
  const [tempList, setTempList] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  useEffect(() => {
    adminService.getDegree().then((res) => {
      console.log(res.data);
      adminContext.onSetDegreeList(res.data);
      console.log(adminContext.degreeList);
    });
  }, []);

  useEffect(() => {
    adminService.getDegree().then((res) => {
      setTempList(res.data);
    });
  }, [adminContext.degreeList]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);

    console.log(searchText);
  };
  const handleSearch = () => {
    if (searchText) {
      const filteredList = tempList.filter((item) => {
        try {
          if (
            item.degreeCode.includes(searchText) ||
            item.degreeName.includes(searchText)
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
        adminContext.onSetDegreeList(filteredList);
      } else {
        setIsSearchSuccessful(false);
      }
    } else {
      adminService.getDegree().then((res) => {
        adminContext.onSetDegreeList(res.data);
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
            to="/admin/add-degree"
          >
            Add Degree
          </Button>
        </Grid>

        {isSearchSuccessful ? (
          <DegreeListTable2 details={adminContext.degreeList} />
        ) : (
          <div>Search not found</div>
        )}
      </div>
    </>
  );
};

export default DegreeListPage;
