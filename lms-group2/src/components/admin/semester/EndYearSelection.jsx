import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const EndYearSelection = ({ form, onSetForm, value, label }) => {
  const accountFormContext = useContext(AccountFormContext);
  const currentYear = new Date().getFullYear();
  const handleChange = (event) => {
    onSetForm({
      ...form,
      endingYear: event.target.value,
    });
    console.log(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {label}
        </InputLabel>
        <NativeSelect
          value={value}
          onChange={handleChange}
          inputProps={{
            name: `${value}`,

            id: "uncontrolled-native",
          }}
        >
          <option></option>

          <option value={currentYear}>{currentYear}</option>
          <option value={currentYear + 1}>{currentYear + 1}</option>
          <option value={currentYear + 2}>{currentYear + 2}</option>
          <option value={currentYear + 3}>{currentYear + 3}</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default EndYearSelection;
