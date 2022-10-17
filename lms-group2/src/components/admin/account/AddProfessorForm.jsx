import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { getProfessors } from "../../../services/admin/AccountService";
import { AdminContext } from "../../../context/admin/account/adminContext";
import { assignProfessor } from "../../../services/professor/LectureService";

const AddProfessorForm = () => {
  const params = useParams();
  const adminContext = useContext(AdminContext);
  const [professorForm, setProfessorForm] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    getProfessors().then((res) => setList(res.data));
  });
  const handleChange = (event) => {
    setProfessorForm(event.currentTarget.value);
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ marginTop: "80px" }}
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(professorForm);
        console.log(params.id);
        assignProfessor(params.id, professorForm).then((res) =>
          console.log(res)
        );
        //   console.log(timeslotForm);
        //   if (adminContext.isTimeslotEdit) {
        //     adminService
        //       .editTimeslot(timeslotId, timeslotForm)
        //       .then((res) => console.log(res));
        //   } else {
        //     adminService
        //       .addTimeslot(timeslotForm)
        //       .then((res) => console.log(res));
        //   }

        //   adminContext.onSetIsEdit(false);
      }}
    >
      <Grid item xs={12} md={6} sm={6}>
        <Card>
          <CardHeader title="Table" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Professor
                    </InputLabel>
                    <NativeSelect
                      value={professorForm}
                      onChange={handleChange}
                      inputProps={{
                        name: "professorForm",

                        id: "uncontrolled-native",
                      }}
                    >
                      <option></option>
                      {list.map((item) => {
                        if (item.firstName !== "PROF PLACEHOLDER") {
                          return (
                            <option key={item.accountId} value={item.accountId}>
                              {`${item.firstName} ${item.lastName}`}
                            </option>
                          );
                        }
                      })}
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <CardActions>
              <Button type="submit">Submit</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddProfessorForm;
