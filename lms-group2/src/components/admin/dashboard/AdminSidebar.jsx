import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { ListItemIcon } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Face4Icon from "@mui/icons-material/Face4";
import WcIcon from "@mui/icons-material/Wc";
import Face3Icon from "@mui/icons-material/Face3";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const AdminSidebar = () => {
  return (
    <Drawer variant="permanent">
      <Toolbar />
      <Box sx={{ display: "flex" }}>
        <List>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/student/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Admin"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <WcIcon />
              </ListItemIcon>
              <ListItemText primary={"Student"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <Face4Icon />
              </ListItemIcon>
              <ListItemText primary={"Faculty"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <Face3Icon />
              </ListItemIcon>
              <ListItemText primary={"Parent"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary={"Degree"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText primary={"Courses"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={"Lecture"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <BookmarksIcon />
              </ListItemIcon>
              <ListItemText primary={"Pre-Requisite"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={"Semester"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary={"Timeslot"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton LinkComponent={Link} to="/">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
