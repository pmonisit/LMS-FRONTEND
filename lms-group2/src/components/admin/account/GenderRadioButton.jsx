import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AccountForm from "./AccountForm";

export default function GenderRadioButton({ accountForm, onSetAccountForm }) {
  const handleChange = (event) => {
    onSetAccountForm({ ...accountForm, gender: event.target.value });
    console.log(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={accountForm.gender}
        onChange={handleChange}
      >
        <FormControlLabel value="F" control={<Radio />} label="Female" />
        <FormControlLabel value="M" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
  );
}
