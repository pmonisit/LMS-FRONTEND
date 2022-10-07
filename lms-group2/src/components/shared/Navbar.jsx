// React
import React from "react";
import { Link } from "react-router-dom";

//Material Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

// Services
import * as accountService from "../../services/accounts";

const Navbar = ({ onLogout }) => {
  const currentUser = accountService.getCurrentUser();
  const accessToken = accountService.getAccessToken();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TISS
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "inherit",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Button
                  color="inherit"
                  onClick={handleCloseNavMenu}
                  LinkComponent={Link}
                  to="/"
                >
                  Home
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="inherit"
                  onClick={handleCloseNavMenu}
                  LinkComponent={Link}
                  to="/"
                >
                  Announcements
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="inherit"
                  onClick={handleCloseNavMenu}
                  LinkComponent={Link}
                  to="/"
                >
                  About
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="inherit"
                  onClick={handleCloseNavMenu}
                  LinkComponent={Link}
                  to="/"
                >
                  Contact
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TISS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" LinkComponent={Link} to="/">
              Home
            </Button>
            <Button color="inherit" LinkComponent={Link} to="/">
              Announcements
            </Button>
            <Button color="inherit" LinkComponent={Link} to="/">
              About
            </Button>
            <Button color="inherit" LinkComponent={Link} to="/">
              Contact
            </Button>
          </Box>

          <Box>
            {accessToken ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Button
                      color="inherit"
                      onClick={handleCloseUserMenu}
                      LinkComponent={Link}
                      to="/"
                    >
                      Profile
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="inherit"
                      onClick={handleCloseUserMenu}
                      LinkComponent={Link}
                      to="/"
                    >
                      Dashboard
                    </Button>
                  </MenuItem>

                  <MenuItem>
                    <Button
                      color="inherit"
                      onClick={() => {
                        handleCloseUserMenu();
                        onLogout();
                      }}
                      LinkComponent={Link}
                      to="/"
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" LinkComponent={Link} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
