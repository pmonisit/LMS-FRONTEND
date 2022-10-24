import React, { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
import { UserInterfaceContext } from "../../../context/shared/UserInterfaceContext";

const AddProfessorForm = () => {
  const navigate = useNavigate();
  const { onOpenSnackbar } = useContext(UserInterfaceContext);
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
        assignProfessor(params.id, professorForm).then((res) => {
          console.log(res);
          onOpenSnackbar({
            open: true,
            severity: "success",
            message: "Successfully assigned a Professor",
          });
          navigate("/admin/lecture-list");
        });
      }}
    >
      <Grid item xs={10} md={3} sm={4}>
        <Card>
          <CardHeader title="Assign Professor" />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={10} md={10} sm={10}>
                <Box>
                  <FormControl>
                    <InputLabel
                      fullWidth
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
          </CardContent>
          <CardActions>
            <Button type="submit" fullWidth variant="contained">
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddProfessorForm;
