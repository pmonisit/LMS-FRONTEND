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
import Button from "@mui/material/Button";

// Service
import * as accountService from "../../services/shared/accounts";

const StudentProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    accountService
      .getCurrentUser()
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert("Account may have already been deleted.");
        }
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
                  <Link to={`/student/profile/edit/${user[0]}`}>
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
                    Full Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[2]} {user[3]} {user[4]}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    Degree Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[12]}
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
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom color="#b71c1c">
                    Username:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    {" "}
                    {user[8]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Grid margin={3}>
              <Button
                variant="outlined"
                LinkComponent={Link}
                to={`/student/profile/changePassword/${user[0]}`}
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

export default StudentProfile;
