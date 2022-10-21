import React, { useEffect, useContext, useState } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getStudents, getAccounts } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import * as degreeService from "../../services/admin/DegreeService";
import { AdminContext } from "../../context/admin/account/adminContext";
import StudentFilterSelection from "../../components/admin/account/StudentFilterSelection";
import TextField from "@mui/material/TextField";
import * as accountService from "../../services/admin/AccountService";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";
import { Box, Fab, Typography } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import InputAdornment from "@mui/material/InputAdornment";

const StudentListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const adminContext = useContext(AdminContext);
  const { studentList, onSetStudentList, onSetAccountList } =
    accountFormContext;
  const [degreeId, setDegreeId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [tempStudentList, setTempStudentList] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);
  const [degrees, setDegrees] = useState([]);
  useEffect(() => {
    getStudents().then((res) => {
      onSetStudentList(res.data);
    });
    getAccounts().then((res) => {
      onSetAccountList(res.data);
    });
  }, []);

  useEffect(() => {
    getStudents().then((res) => setTempStudentList(res.data));
  }, [accountFormContext.studentList]);

  useEffect(() => {
    const fetchDegree = async () => {
      const res = await degreeService.getDegree();
      console.log(res.data);
      setDegrees(res.data);
    };
    fetchDegree();
  }, []);

  useEffect(() => {
    const fetchStudent = async (degreeId) => {
      const res = await accountService.getStudents();
      if (degreeId == "all") {
        onSetStudentList(res.data);
      } else {
        const students = res.data;
        const studentByDegree = students.filter((student) => {
          if (student.degreeId == degreeId) {
            return student;
          }
        });
        onSetStudentList(studentByDegree);
      }
    };
    fetchStudent(degreeId);
  }, [degreeId]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearch = () => {
    if (searchText) {
      const filteredStudentList = tempStudentList.find((student) => {
        try {
          if (
            student.lastName.includes(searchText) ||
            student.firstName.includes(searchText) ||
            student.middleName.includes(searchText)
          ) {
            setIsSearchSuccessful(true);
            return student;
          } else {
            setIsSearchSuccessful(false);
          }
        } catch (error) {
          //alert("search not found");
        }
      });
      console.log([filteredStudentList]);
      if (filteredStudentList) {
        accountFormContext.onSetStudentList([filteredStudentList]);
      }
    } else {
      getStudents().then((res) => {
        onSetStudentList(res.data);
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
              STUDENT ACCOUNTS
            </Typography>
          </Grid>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6} sm={6}>
              <StudentFilterSelection
                list={degrees}
                label="List of Degrees"
                form={degreeId}
                onSetForm={setDegreeId}
                value={degreeId}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <TextField
                label="Search"
                variant="standard"
                value={searchText}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonSearchIcon
                        onClick={handleSearch}
                        cursor="pointer"
                        mr={5}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container justifyContent="end" spacing={2} marginBottom={2}>
              <Fab
                color="primary"
                LinkComponent={Link}
                to="/admin/add-user"
                onClick={() => {
                  accountFormContext.onSetIsRole({
                    isStudent: true,
                    isAdmin: false,
                    isParent: false,
                    isProfessor: false,
                  });
                }}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          {isSearchSuccessful ? (
            <ListTable details={studentList} />
          ) : (
            <div>Search not found</div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default StudentListPage;
