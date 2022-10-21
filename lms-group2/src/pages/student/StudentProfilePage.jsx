import StudentProfile from "../../components/student/StudentProfile";
import Box from "@mui/material/Box";
import Sidebar from "../../components/shared/Sidebar";

const StudentProfilePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <StudentProfile />
      </Box>
    </Box>
  );
};

export default StudentProfilePage;
