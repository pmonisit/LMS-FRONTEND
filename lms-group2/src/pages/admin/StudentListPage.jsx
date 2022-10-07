import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getStudents } from "../../services/admin/AccountService";

const StudentListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { studentList, onSetStudentList } = accountFormContext;
  useEffect(() => {
    getStudents().then((res) => {
      onSetStudentList(res.data);
    });
  });

  return <ListTable details={studentList} />;
};

export default StudentListPage;
