import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getProfessors } from "../../services/admin/AccountService";

const ProfessorListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { professorList, onSetProfessorList } = accountFormContext;
  useEffect(() => {
    getProfessors().then((res) => {
      onSetProfessorList(res.data);
    });
  });
  return <ListTable details={professorList} />;
};

export default ProfessorListPage;
