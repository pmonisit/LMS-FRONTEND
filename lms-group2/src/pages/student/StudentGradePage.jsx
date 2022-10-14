import StudentGrade from "../../components/student/StudentGrade";
import Box from "@mui/material/Box";
import Sidebar from "../../components/shared/Sidebar";

const StudentGradePage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <StudentGrade />
      </Box>
    </Box>
  );
};
export default StudentGradePage;
