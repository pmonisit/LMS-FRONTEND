// React
import React from "react";
import { Link } from "react-router-dom";

// Material Components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BannerLayout from "./BannerLayout";

// Services
import * as accountService from "../services/accounts";

const backgroundImage =
  "https://images.unsplash.com/photo-1620458738323-4148c6093433?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

const accessToken = accountService.getAccessToken();
const currentUser = accountService.getCurrentUser();

const Banner = () => {
  return (
    <BannerLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9",
        backgroundPosition: "center",
      }}
    >
      <Typography color="inherit" align="center" variant="h2">
        Welcome to TISS
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10, lg: 5 } }}
      >
        Technological Institute of Seven Seven
      </Typography>

      {accessToken ? (
        ""
      ) : (
        <Button
          color="secondary"
          variant="contained"
          size="large"
          sx={{ minWidth: 200 }}
          LinkComponent={Link}
          to="/login"
        >
          Login
        </Button>
      )}

      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Opportunities for lifelong learning
      </Typography>
    </BannerLayout>
  );
};

export default Banner;
