import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import Pagination from '@mui/material/Pagination';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function LeavesTable({ leaveData }) {
  // React State
  const [page, setPage] = useState(1);

  // Loop that updates the leave data according to the pagenatiom limit of a page count
  // eslint-disable-next-line
  const filteredLeaveData = leaveData.filter((i, j) => {
    if (page === 1 && j + 1 <= 10) {
      return i;
    } else if (page > 1) {
      const end = page * 10;
      const start = end - 10;
      if (j + 1 > start && j + 1 <= end) {
        return i;
      }
    }
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    setPage(1);
  }, [leaveData]);

  return filteredLeaveData.length > 0 ? (
    <div>
      <TableContainer
        style={{ maxWidth: '90%', margin: '0 auto' }}
        component={Paper}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ backgroundColor: 'purple' }}>
            <TableRow>
              <TableCell style={{ color: 'white' }} align="center">
                Start Date
              </TableCell>
              <TableCell style={{ color: 'white' }} align="center">
                End Date
              </TableCell>
              <TableCell style={{ color: 'white' }} align="center">
                Reason
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaveData.map((row, i) => (
              <StyledTableRow key={i}>
                <TableCell align="center">{row.start_date}</TableCell>
                <TableCell align="center">{row.end_date}</TableCell>
                <TableCell align="center">{row.reason || '-'}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {leaveData.length > 10 ? (
        <Pagination
          style={{
            marginLeft: 'auto',
            marginRight: '0',
            marginTop: '1.3em',
            width: '25em',
          }}
          count={Math.ceil(leaveData.length / 10)}
          page={page}
          color="secondary"
          onChange={handleChange}
        />
      ) : null}
    </div>
  ) : (
    <h1 style={{ marginTop: '8em' }}>No Data</h1>
  );
}
