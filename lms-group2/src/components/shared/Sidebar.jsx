import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import SubscriptionsRoundedIcon from "@mui/icons-material/SubscriptionsRounded";

const Sidebar = () => {
  const drawerWidth = 200;
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/dashboard">
              <ListItemIcon>
                <DashboardRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/profile">
              <ListItemIcon>
                <AccountBoxRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/curriculum">
              <ListItemIcon>
                <SchoolRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Curriculum"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/enrolment">
              <ListItemIcon>
                <SubscriptionsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Enrolment"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/courses">
              <ListItemIcon>
                <AutoStoriesRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Courses"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/schedule">
              <ListItemIcon>
                <ScheduleRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Schedule"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/attendance">
              <ListItemIcon>
                <EventNoteRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Attendance"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/grades">
              <ListItemIcon>
                <GradeRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={"Grades"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
