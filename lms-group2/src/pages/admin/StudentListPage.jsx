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
      if (degreeId === "all") {
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
      <div style={{ marginTop: "80px" }}>
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
            />
            <Button onClick={handleSearch}>Search</Button>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
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
              Add Student
            </Button>
          </Grid>
        </Grid>
        {isSearchSuccessful ? (
          <ListTable details={studentList} />
        ) : (
          <div>Search not found</div>
        )}
      </div>
    </>
  );
};

export default StudentListPage;
