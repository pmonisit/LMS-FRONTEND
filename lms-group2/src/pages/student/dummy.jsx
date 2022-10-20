import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import Sidebar from "../../components/shared/Sidebar";

const StudentSchedulePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid>
          <Toolbar />
          <h3 align="center">Desired Schedule for {}</h3>
        </Grid>
      </Box>
    </Box>
  );
};

export default StudentSchedulePage;
