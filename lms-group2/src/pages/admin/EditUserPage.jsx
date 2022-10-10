import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AccountFormContext } from "../../context/admin/account/AccountFormContext";
import * as adminService from "../../services/admin/AccountService";
import GenericForm from "../../components/admin/account/GenericForm";

const EditUserPage = () => {
  const params = useParams();
  const accountFormContext = useContext(AccountFormContext);

  const { accountId, ...account } = accountFormContext.accountList.find(
    (data) => data.accountId === +params.id
  );
  const accountClone = { ...account };
  Object.keys(account).forEach((key) => {
    if (account[key] === null || account[key] === "undefined") {
      accountClone[key] = "";
    }
  });

  return (
    <>
      <GenericForm initialValue={accountClone} accountId={accountId} />
    </>
  );
};

export default EditUserPage;
