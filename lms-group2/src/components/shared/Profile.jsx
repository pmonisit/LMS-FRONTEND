// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Material Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

// Service
import * as accountService from "../../services/shared/accounts";
import { Button } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    accountService.getCurrentUser().then((response) => {
      setUser(response.data[0]);
      // console.log(response.data[0]);
    });
  }, [user]);

  if (user) {
    return (
      <Grid container justifyContent="center" component="form" marginTop={10}>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <Card>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Typography margin={2} variant="h6">
                  Basic Info
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} textAlign="right">
                <Tooltip title="Edit Info">
                  <Link to={`/profile/edit/${user[0]}`}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Grid>
            </Grid>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    ID Number:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[9]}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    First Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[2]}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    Middle Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[3]}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    Last Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[4]}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    Gender:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[5]}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    Birthdate
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[6]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Typography margin={2} variant="h6">
              Account Settings
            </Typography>

            <Grid margin={3}>
              <Button
                variant="outlined"
                LinkComponent={Link}
                to={`/profile/changePassword/${user[0]}`}
                fullWidth
              >
                Change Password
              </Button>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default Profile;
