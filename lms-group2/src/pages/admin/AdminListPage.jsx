import React, { useEffect, useContext } from "react";
import ListTable from "../../components/admin/account/ListTable";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import { getAdmins } from "../../services/admin/AccountService";

const AdminListPage = () => {
  const accountFormContext = useContext(AccountFormContext);
  const { adminList, onSetAdminList } = accountFormContext;
  useEffect(() => {
    getAdmins().then((res) => {
      onSetAdminList(res.data);
    });
  }, []);
  console.log(adminList);
  return <ListTable details={adminList} />;
};

export default AdminListPage;
