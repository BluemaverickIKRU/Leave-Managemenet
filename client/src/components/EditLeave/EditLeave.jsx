import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import EditIcon from '@mui/icons-material/Edit';

import { useSelector } from 'react-redux';

import './EditLeave.css';

const EditLeave = () => {
  // Redux state
  const leaveData = useSelector((state) => state.user.leaveData);

  // React state
  const [filteredLeaveData, setFilteredLeaveData] = useState([]);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  useEffect(() => {
    if (filteredLeaveData.length === 0) {
      setFilteredLeaveData(
        leaveData.filter(
          (i) => i.start_date >= new Date().toISOString().slice(0, 10)
        )
      );
    }
    console.log(filteredLeaveData);
  }, []);

  return (
    <div>
      <p
        style={{
          margin: '0.5em',
          color: 'purple',
          fontSize: '2rem',
          borderBottom: '3px solid',
          width: '11em',
        }}
      >
        Edit leave application
      </p>
      <div className="edit-leave-container">
        {filteredLeaveData.length > 0 ? (
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
                  <TableCell style={{ color: 'white' }} align="center">
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLeaveData.map((row, i) => (
                  <StyledTableRow key={i}>
                    <TableCell align="center">{row.start_date}</TableCell>
                    <TableCell align="center">{row.end_date}</TableCell>
                    <TableCell align="center">{row.reason || '-'}</TableCell>
                    <TableCell align="center">
                      <div onClick={() => {}}>
                        <EditIcon fontSize="small" />
                      </div>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h1 style={{ marginTop: '8em' }}>No Data</h1>
        )}
      </div>
    </div>
  );
};

export default EditLeave;
