import React, { useEffect, useContext, useState } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getParents, getAccounts } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AdminSidebar from "../../components/admin/dashboard/AdminSidebar";
import LinkMenu from "../../components/admin/dashboard/LinkMenu";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Box, Fab, InputAdornment, Typography } from "@mui/material";

const ParentListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { parentList, onSetParentList, onSetAccountList } = accountFormContext;
  const [searchText, setSearchText] = useState("");
  const [tempList, setTempList] = useState([]);
  const [isSearchSuccessful, setIsSearchSuccessful] = useState(true);

  useEffect(() => {
    getParents().then((res) => {
      onSetParentList(res.data);
    });
    getAccounts().then((res) => {
      onSetAccountList(res.data);
    });
  }, []);

  useEffect(() => {
    getParents().then((res) => setTempList(res.data));
  }, [accountFormContext.parentList]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);

    console.log(searchText);
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
      console.log([filteredList]);
      if (filteredList) {
        accountFormContext.onSetParentList([filteredList]);
      }
    } else {
      getParents().then((res) => {
        onSetParentList(res.data);
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
              PARENT ACCOUNTS
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
                  isProfessor: false,
                  isParent: false,
                  isAdmin: true,
                });
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
          {isSearchSuccessful ? (
            <ListTable details={parentList} />
          ) : (
            <div>Search not found</div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ParentListPage;
