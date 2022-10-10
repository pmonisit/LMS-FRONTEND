import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getProfessors } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ProfessorListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { professorList, onSetProfessorList } = accountFormContext;
  useEffect(() => {
    getProfessors().then((res) => {
      onSetProfessorList(res.data);
    });
  });
  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        LinkComponent={Link}
        to="/admin/add-user"
      >
        Add Professor
      </Button>
      <ListTable details={professorList} />;
    </>
  );
};

export default ProfessorListPage;
