import Attendance from "../../components/student/Attendance";
import Box from "@mui/material/Box";
import Sidebar from "../../components/shared/Sidebar";

const StudentAttendancePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Attendance />
      </Box>
    </Box>
  );
};
export default StudentAttendancePage;
