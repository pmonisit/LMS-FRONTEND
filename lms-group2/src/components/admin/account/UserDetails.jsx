import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import { getAccountById } from "../../../services/admin/AccountService";
import * as degreeService from "../../../services/admin/DegreeService";

const UserDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [degree, setDegree] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    getAccountById(params.id).then((response) => {
      setLoading(false);
      setUser(response.data);
    });
  }, [params.id]);

  const handleDelete = async (id) => {
    // await deleteEmployee(id);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user) {
    degreeService
      .getDegreeById(user.degreeId)
      .then((res) => setDegree(res.data.degreeName));
    return (
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${user.firstName} ${user.middleName ? user.middleName : ""} ${
            user.lastName
          }`}
          subheader={`@${user.username}`}
        />
        <CardContent>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => navigate(`/employees/${user.id}/edit`)}>
              Edit
            </MenuItem>
            <MenuItem
              onClick={async () => {
                await handleDelete(user.AccountId);
                navigate("/");
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Typography variant="overline">Role</Typography>
              <Typography variant="body2">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Account Id</Typography>
              <Typography variant="body2">{user.accountId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Gender</Typography>
              <Typography variant="body2">
                {user.gender === "m" ? "Male" : "Female"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">Birth Date</Typography>
              <Typography variant="body2">{user.birthdate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Active</Typography>
              <Typography variant="body2">
                {user.active ? "Yes" : "No"}
              </Typography>
            </Grid>
            {user.role === "student" && (
              <Grid item xs={6}>
                <Typography variant="overline">Degree</Typography>
                <Typography variant="body2">{degree}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  }
};

export default UserDetails;
