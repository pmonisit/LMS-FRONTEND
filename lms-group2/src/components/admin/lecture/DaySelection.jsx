import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const DaySelection = ({ list, form, onSetForm, id, label, day }) => {
  const accountFormContext = useContext(AccountFormContext);

  const handleChange = (event) => {
    onSetForm({
      ...form,
      dayOne: event.target.value,
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
          value={day}
          onChange={handleChange}
          inputProps={{
            name: `${id}`,

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          <option value="M">Monday</option>
          <option value="T">Tuesday</option>
          <option value="W">Wednesday</option>
          <option value="Th">Thursday</option>
          <option value="F">Friday</option>
          <option value="S">Saturday</option>
          <option value="Su">Sunday</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default DaySelection;
