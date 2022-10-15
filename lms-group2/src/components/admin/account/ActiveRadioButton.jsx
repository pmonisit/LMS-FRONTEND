import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AccountForm from "./AccountForm";
import { findAllByDisplayValue } from "@testing-library/react";

export default function GenderRadioButton({ accountForm, onSetAccountForm }) {
  const handleChange = (event) => {
    onSetAccountForm({ ...accountForm, active: event.target.value });
    console.log(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Active</FormLabel>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={accountForm.active}
        onChange={handleChange}
      >
        <FormControlLabel value={true} control={<Radio />} label="True" />
        <FormControlLabel value={false} control={<Radio />} label="False" />
      </RadioGroup>
    </FormControl>
  );
}
