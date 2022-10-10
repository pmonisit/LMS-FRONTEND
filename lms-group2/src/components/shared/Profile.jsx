// React
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Material Components
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

// Service
import * as accountService from "../../services/shared/accounts";

const Profile = () => {
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
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <CardHeader title="Personal Information" />
              </Grid>
              <Grid item xs={6} sm={6} textAlign="right">
                <Tooltip title="Edit Info">
                  <Link to={`/profile/edit/${user.accountId}`}>
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
                  <Typography variant="h6" gutterBottom color="#b71c1c">
                    First Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    {user.firstName}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom color="#b71c1c">
                    Middle Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    {user.middleName}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom color="#b71c1c">
                    Last Name:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    {user.lastName}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom color="#b71c1c">
                    Gender:
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    {user.gender}
                  </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom color="#b71c1c">
                    Birthdate
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    {" "}
                    {user.birthdate}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default Profile;
