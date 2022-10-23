import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const Time2Selection = ({ list, form, onSetForm, id, label, time }) => {
  const accountFormContext = useContext(AccountFormContext);

  const handleChange = (event) => {
    onSetForm({
      ...form,
      endTime: event.target.value,
    });
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {label}
        </InputLabel>
        <NativeSelect
          value={time}
          onChange={handleChange}
          inputProps={{
            name: `${id}`,

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          <option value="7:00">7:00 AM</option>
          <option value="8:00">8:00 AM</option>
          <option value="9:00">9:00 AM</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="1:00">1:00 PM</option>
          <option value="2:00">2:00 PM</option>
          <option value="3:00">3:00 PM</option>
          <option value="4:00">4:00 PM</option>
          <option value="5:00">5:00 PM</option>
          <option value="6:00">6:00 PM</option>
          <option value="7:00">7:00 PM</option>
          <option value="8:00">8:00 PM</option>
          <option value="9:00">9:00 PM</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default Time2Selection;
