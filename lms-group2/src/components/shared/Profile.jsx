// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Material Components
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

// Service
import * as accountService from "../../services/shared/accounts";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUser(response.data);
    });
  }, [user]);

  if (user) {
    return (
      <Grid container justifyContent="center" component="form" marginTop={4}>
        <Grid item xs={10} sm={10} md={6} lg={4} xl={4}>
          <Card>
            <CardHeader title="Personal Information" />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography>FIRST NAME: {user.firstName}</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid xs={6}>
                    <Typography>Middle Name: {user.middleName}</Typography>
                  </Grid>
                  <Grid xs={6}></Grid>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Last Name: {user.lastName}</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Gender: {user.gender}</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography>BirthDate: {user.birthdate}</Typography>
                  <Divider />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                onClick={() => navigate(`/profile/edit/${user.accountId}`)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default Profile;
