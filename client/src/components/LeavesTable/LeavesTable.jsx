import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';

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
  return leaveData.length > 0 ? (
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
          {leaveData.map((row, i) => (
            <StyledTableRow key={i}>
              <TableCell align="center">{row.start_date}</TableCell>
              <TableCell align="center">{row.end_date}</TableCell>
              <TableCell align="center">{row.reason || '-'}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <h1 style={{ marginTop: '8em' }}>No Data</h1>
  );
}
