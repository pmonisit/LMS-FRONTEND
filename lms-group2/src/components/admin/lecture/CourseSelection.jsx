import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { AccountFormContext } from "../../../context/admin/account/AccountFormContext";

const CourseSelection = ({ list, form, onSetForm, id, label, selectedId }) => {
  const accountFormContext = useContext(AccountFormContext);

  const handleChange = (event) => {
    onSetForm({
      ...form,
      courseId: event.target.value,
    });
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
            name: "courseId",

            id: "uncontrolled-native",
          }}
        >
          <option></option>
          {list.map((item) => {
            return (
              <option key={item.courseId} value={item.courseId}>
                {item.courseCode}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default CourseSelection;
