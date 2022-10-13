import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { GradeContext } from "../../context/student/GradeContext";
import { Button } from "@mui/material";

const StudentGrade = () => {
  const { gradeColumns, mySemestersWithGrades, renderGrades } =
    useContext(GradeContext);

  const handleLoop = () => {
    console.log(mySemestersWithGrades);
  };

  return (
    <Grid>
      <Button onClick={handleLoop}>TEST</Button>
      {mySemestersWithGrades.map((semester) => (
        <Paper sx={{ width: "100%", overflow: "hidden" }} key={semester[0]}>
          <h3 align="center">
            {semester[3]} AY {semester[1]} - {semester[2]}
          </h3>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {gradeColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>{renderGrades(semester[0])}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Grid>
  );
};
export default StudentGrade;
