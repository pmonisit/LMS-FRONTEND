import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const Selection = ({ list, accountForm, onSetAccountForm, childId }) => {
  const accountFormContext = useContext(AccountFormContext);

  const handleChange = (event) => {
    onSetAccountForm({
      ...accountForm,
      childId: event.target.value,
    });
    console.log(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Child Name
        </InputLabel>
        <NativeSelect
          value={childId}
          onChange={handleChange}
          inputProps={{
            name: "childId",

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          {list.map((item) => {
            return (
              <option
                key={item.accountId}
                value={item.accountId}
              >{`${item.lastName}, ${item.middleName} ${item.firstName}`}</option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default Selection;
