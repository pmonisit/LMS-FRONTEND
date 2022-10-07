import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const RoleSelection = ({ onHandleChange }) => {
  const accountFormContext = useContext(AccountFormContext);
  const { role } = accountFormContext.accountForm;

  const handleChange = (event) => {
    accountFormContext.onSetAccountForm({
      ...accountFormContext.accountForm,
      role: event.target.value,
    });
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Role
        </InputLabel>
        <NativeSelect
          value={role}
          onChange={handleChange}
          inputProps={{
            name: "role",

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          <option value={"student"}>Student</option>
          <option value={"professor"}>Professor</option>
          <option value={"admin"}>Administrator</option>
          <option value={"parent"}>Parent</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default RoleSelection;
