import { FilterListOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, useMemo, useState } from "react";
import { Applied } from "../../../../../@types/types";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/hooks";
import { startSelectFreelancer } from "../../../../../store";

interface Data {
  id: number;
  userName: string;
  technologies: string;
  date: string;
  freelancer: Applied;
}

function createData(
  id: number,
  userName: string,
  technologies: string,
  date: string,
  freelancer: Applied
): Data {
  return {
    id,
    userName,
    technologies,
    date,
    freelancer,
  };
}

interface HeadCell {
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    label: "User",
  },
  {
    label: "Technologies",
  },
  {
    label: "Date",
  },
  {
    label: "Actions",
  },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'></TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.label === "Actions" ? "right" : "inherit"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export const TableNoteView = () => {
  const { offerActive } = useAppSelector((state) => state.offer);
  const dispatch = useAppDispatch();
  // console.log(offerActive?.applied);

  const selectFreelancer = (freelancer: Applied) => {
    dispatch(startSelectFreelancer(offerActive?.id || 0, freelancer));
  };

  const rows: Data[] = useMemo(() => {
    return (
      offerActive?.applied.map((freelancer) =>
        createData(
          freelancer.id,
          freelancer.freelancerName,
          freelancer.technologies[0]?.name || "",
          freelancer.applicationDate,
          freelancer
        )
      ) || []
    );
  }, [offerActive?.applied]);

  // const rows: Data[] =
  //   offerActive?.applied.map((freelancer) =>
  //     createData(
  //       freelancer.id,
  //       freelancer.freelancerName,
  //       freelancer.technologies[0]?.name || "",
  //       freelancer.applicationDate
  //     )
  //   ) || [];

  // useEffect(() => {
  //   getRows(applied);
  // }, [offerActive]);

  // console.log("ROWS", rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Toolbar
            sx={[
              {
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              },
            ]}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant='h6'
              id='tableTitle'
              component='div'
            >
              Freelancers' applications
            </Typography>

            <Tooltip title='Filter list'>
              <IconButton>
                <FilterListOutlined />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Divider />
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map((row) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Avatar>{row.userName.substring(0, 1)}</Avatar>
                    </TableCell>
                    <TableCell component='th' scope='row' padding='none'>
                      {row.userName}
                    </TableCell>
                    <TableCell>{row.technologies}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell align='right'>
                      <Button onClick={() => selectFreelancer(row.freelancer)}>
                        Select freelancer
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
