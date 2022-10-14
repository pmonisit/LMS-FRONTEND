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
import * as lectureService from "../../../services/professor/LectureService";

const LectureDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    lectureService.getLectureById(params.id).then((response) => {
      console.log(response.data);
      setLoading(false);
      setLecture(response.data);
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

  if (lecture) {
    return (
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title={lecture[0][3]}
          subheader={`Section : ${lecture[0][10]}`}
        />
        <CardContent>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem
            // onClick={() => navigate(`/employees/${user.id}/edit`)}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={async () => {
                // await handleDelete(user.AccountId);
                navigate("/");
              }}
            >
              Delete
            </MenuItem>
          </Menu>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Typography variant="overline">Lecture Id</Typography>
              <Typography variant="body2">{lecture[0][0]}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">Professor Name</Typography>
              <Typography variant="body2">{` ${lecture[0][7]} ${lecture[0][9]}`}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">Semester</Typography>
              <Typography variant="body2">For Request</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Capacity</Typography>
              <Typography variant="body2">{lecture[0][15]}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Desired</Typography>
              <Typography variant="body2">{lecture[0][16]}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Schedule</Typography>
              <Typography variant="body2">{`${lecture[0][11]} & ${lecture[0][12]}`}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">Time</Typography>
              <Typography variant="body2">{`${lecture[0][13]} - ${lecture[0][14]}`}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
};

export default LectureDetails;
