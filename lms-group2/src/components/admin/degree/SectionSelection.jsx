import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const SectionSelection = ({ list, form, onSetForm, value, label }) => {
  const handleChange = (event) => {
    onSetForm(event.target.value);
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
            name: "section",

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          {list.map((item, index) => {
            return (
              <option key={index} value={item}>
                {`Section ${item}`}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default SectionSelection;
