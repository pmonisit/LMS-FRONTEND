import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getParents } from "../../services/admin/AccountService";

const ParentListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { parentList, onSetParentList } = accountFormContext;
  useEffect(() => {
    getParents().then((res) => {
      onSetParentList(res.data);
    });
  });
  return <ListTable details={parentList} />;
};

export default ParentListPage;
