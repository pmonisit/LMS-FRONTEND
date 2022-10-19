import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const drawerWidth = 150;
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
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/profile">
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/curriculum">
              <ListItemText primary={"Curriculum"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/enrolment">
              <ListItemText primary={"Enrolment"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/courses">
              <ListItemText primary={"Courses"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/schedule">
              <ListItemText primary={"Schedule"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/attendance">
              <ListItemText primary={"Attendance"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton LinkComponent={Link} to="/student/grades">
              <ListItemText primary={"Grades"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
