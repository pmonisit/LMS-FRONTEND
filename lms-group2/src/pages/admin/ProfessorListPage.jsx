import React, { useEffect, useContext, useState } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import {
  getProfessors,
  getAccounts,
} from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Box, Fab, InputAdornment, Typography } from "@mui/material";

const ProfessorListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { professorList, onSetProfessorList, onSetAccountList } =
    accountFormContext;

  const [searchText, setSearchText] = useState("");
  const [tempList, setTempList] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);

  useEffect(() => {
    getProfessors().then((res) => {
      onSetProfessorList(res.data);
    });
    getAccounts().then((res) => {
      onSetAccountList(res.data);
    });
  }, []);

  useEffect(() => {
    getProfessors().then((res) => setTempList(res.data));
  }, [accountFormContext.professorList]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearch = () => {
    if (searchText) {
      const filteredList = tempList.find((account) => {
        try {
          if (
            account.lastName.includes(searchText) ||
            account.firstName.includes(searchText) ||
            account.middleName.includes(searchText)
          ) {
            setIsSearchSuccessful(true);
            return account;
          } else {
            setIsSearchSuccessful(false);
          }
        } catch (error) {
          //alert("search not found");
        }
      });

      if (filteredList) {
        accountFormContext.onSetProfessorList([filteredList]);
      }
    } else {
      getProfessors().then((res) => {
        onSetProfessorList(res.data);
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
              FACULTY ACCOUNTS
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
          </Grid>
          <Grid container justifyContent="end" spacing={2} marginBottom={2}>
            <Fab
              color="primary"
              LinkComponent={Link}
              to="/admin/add-user"
              onClick={() => {
                accountFormContext.onSetIsRole({
                  isStudent: false,
                  isProfessor: true,
                  isParent: false,
                  isAdmin: false,
                });
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>

          {isSearchSuccessful ? (
            <ListTable details={professorList} />
          ) : (
            <div>Search not found</div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessorListPage;
