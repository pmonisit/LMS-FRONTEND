import React, { useEffect, useContext, useState } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getParents, getAccounts } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

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
            to="/admin/add-user"
            onClick={() => {
              accountFormContext.onSetIsRole({
                isStudent: false,
                isAdmin: false,
                isParent: true,
                isProfessor: false,
              });
            }}
          >
            Add Parent
          </Button>
        </Grid>
        {isSearchSuccessful ? (
          <ListTable details={parentList} />
        ) : (
          <div>Search not found</div>
        )}
      </div>
    </>
  );
};

export default ParentListPage;
