import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getAccounts, getAdmins } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import CourseForm from "../../components/admin/course/CourseForm";
import CourseListPage from "./CourseListPage";

const AdminListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { adminList, onSetAdminList, onSetAccountList } = accountFormContext;
  useEffect(() => {
    getAdmins().then((res) => {
      onSetAdminList(res.data);
    });
    getAccounts().then((res) => {
      onSetAccountList(res.data);
    });
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        LinkComponent={Link}
        to="/admin/add-user"
      >
        Add Administrator
      </Button>
      <ListTable details={adminList} />;
      <CourseForm />
      <CourseListPage />
    </>
  );
};

export default AdminListPage;
