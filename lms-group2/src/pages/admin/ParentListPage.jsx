import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getParents, getAccounts } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ParentListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { parentList, onSetParentList, onSetAccountList } = accountFormContext;
  useEffect(() => {
    getParents().then((res) => {
      onSetParentList(res.data);
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
              isStudent: false,
              isAdmin: false,
              isParent: true,
              isProfessor: false,
            });
          }}
        >
          Add Parent
        </Button>
        <ListTable details={parentList} />;
      </div>
    </>
  );
};

export default ParentListPage;
