import Courses from "../../components/student/Courses";
import Box from "@mui/material/Box";
import Sidebar from "../../components/shared/Sidebar";

const CoursesPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Courses />
      </Box>
    </Box>
  );
};
export default CoursesPage;
