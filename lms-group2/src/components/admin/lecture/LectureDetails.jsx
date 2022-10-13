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
          title={lecture.lectureId}
          subheader={`Lecture ID : ${lecture.lectureId}`}
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
              <Typography variant="overline">Section</Typography>
              <Typography variant="body2">{lecture.section}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Course</Typography>
              <Typography variant="body2">{lecture.courseId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Professor</Typography>
              <Typography variant="body2">{lecture.accountId}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="overline">Semester</Typography>
              <Typography variant="body2">{lecture.semesterId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Capacity</Typography>
              <Typography variant="body2">{lecture.capacity}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Desired</Typography>
              <Typography variant="body2">{lecture.desired}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Day One</Typography>
              <Typography variant="body2">{lecture.dayOne}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Day Two</Typography>
              <Typography variant="body2">{lecture.dayTwo}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">Start Time</Typography>
              <Typography variant="body2">{lecture.startTime}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="overline">End Time</Typography>
              <Typography variant="body2">{lecture.endTime}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
};

export default LectureDetails;
