import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getParents } from "../../services/admin/AccountService";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const ParentListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { parentList, onSetParentList } = accountFormContext;
  useEffect(() => {
    getParents().then((res) => {
      onSetParentList(res.data);
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
        Add Parent
      </Button>
      <ListTable details={parentList} />;
    </>
  );
};

export default ParentListPage;
