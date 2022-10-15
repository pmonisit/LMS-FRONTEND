import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getStudents, getAccounts } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const StudentListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { studentList, onSetStudentList, onSetAccountList } =
    accountFormContext;
  useEffect(() => {
    getStudents().then((res) => {
      onSetStudentList(res.data);
    });
    getAccounts().then((res) => {
      onSetAccountList(res.data);
    });
  });

  return (
    <>
      <div style={{ marginTop: "80px" }}>
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
        <ListTable details={studentList} />
      </div>
    </>
  );
};

export default StudentListPage;
