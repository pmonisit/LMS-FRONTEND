import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const SemesterSelection = ({ list, form, onSetForm, id, label }) => {
  const accountFormContext = useContext(AccountFormContext);

  const handleChange = (event) => {
    onSetForm({
      ...form,
      semesterId: event.target.value,
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
          value={id}
          onChange={handleChange}
          inputProps={{
            name: "semesterId",

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          {list.map((item) => {
            return (
              <option key={item.semesterId} value={item.semesterId}>
                {`${item.semOrder}, ${item.startingYear} - ${item.endingYear}`}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default SemesterSelection;
