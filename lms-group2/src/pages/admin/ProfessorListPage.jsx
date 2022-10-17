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
                isParent: false,
                isProfessor: true,
              });
            }}
          >
            Add Professor
          </Button>
        </Grid>

        {isSearchSuccessful ? (
          <ListTable details={professorList} />
        ) : (
          <div>Search not found</div>
        )}
      </div>
    </>
  );
};

export default ProfessorListPage;
