import Profile from "../../components/shared/Profile";
import Box from "@mui/material/Box";
import Sidebar from "../../components/shared/Sidebar";

const StudentProfilePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Profile />
      </Box>
    </Box>
  );
};

export default StudentProfilePage;
