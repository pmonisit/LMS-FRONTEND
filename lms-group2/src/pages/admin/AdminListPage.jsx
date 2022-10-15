import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getAccounts, getAdmins } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import PrerequisiteForm2 from "../../components/admin/prerequisite/PrerequisiteForm2";

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
      <div style={{ marginTop: "80px" }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
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
          Add Administrator
        </Button>
        <ListTable details={adminList} />;
        <PrerequisiteForm2 />
      </div>
    </>
  );
};

export default AdminListPage;
