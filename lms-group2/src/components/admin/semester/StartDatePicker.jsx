import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function StartDatePicker({ semesterForm, onSetSemesterForm }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (newValue) => {
    console.log(value);
    //  onSetAccountForm({
    //    ...accountForm,
    //    birthdate: value,
    //  });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Start Date"
        value={semesterForm.startDate}
        onChange={(newValue) => {
          // setValue(newValue);
          // handleChange;
          onSetSemesterForm({ ...semesterForm, startDate: newValue });
        }}
        renderInput={(params) => <TextField {...params} variant="standard" />}
      />
    </LocalizationProvider>
  );
}
