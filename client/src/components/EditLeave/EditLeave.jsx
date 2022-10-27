import React from 'react';
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
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';

import './EditLeave.css';
import { editLeaveData } from '../../store/userSlice';

const EditLeave = () => {
  // Cookies
  const [cookie] = useCookies([]);

  const dispatch = useDispatch();

  // Redux state
  const leaveData = useSelector((state) => state.user.leaveData);

  // React State
  const [page, setPage] = React.useState(1);
  const [modalInfo, setModalInfo] = React.useState({
    open: false,
  });
  const [alert, setAlert] = React.useState({
    isAlert: false,
    message: '',
    type: '',
  });

  const handleOpen = (row) =>
    setModalInfo((prev) => {
      return {
        open: true,
        start_date: row.start_date,
        end_date: row.end_date,
        reason: row.reason,
        id: row.id,
      };
    });
  const handleClose = () =>
    setModalInfo((prev) => {
      return { open: false };
    });

  // Filtered data containing upcomig leaves
  const filteredLeaveData = leaveData.filter(
    (i) => i.start_date >= new Date().toISOString().slice(0, 10)
  );

  const PaginationFilteredData =
    // eslint-disable-next-line
    filteredLeaveData.filter((i, j) => {
      if (page === 1 && j + 1 <= 10) {
        return i;
      } else if (page > 1) {
        const end = page * 10;
        const start = end - 10;
        if (j >= start && j <= end) {
          return i;
        }
      }
    });

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FBE9FC',
    border: '4px solid #000',
    boxShadow: 24,
    p: 4,
    paddingBottom: '5em',
    borderRadius: '1em',
  };

  const handleEdit = async () => {
    if (modalInfo.start_date <= modalInfo.end_date) {
      const editReq = await fetch(
        `https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?id=eq.${modalInfo.id}`,
        {
          method: 'PATCH',
          headers: {
            apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
            Authorization: `Bearer ${cookie.accessToken}`,
          },
          body: JSON.stringify({
            start_date: modalInfo.start_date,
            end_date: modalInfo.end_date,
            reason: modalInfo.reason,
          }),
        }
      );
      const editRes = await editReq.json();
      if (editRes[0].id) {
        dispatch(editLeaveData({ id: modalInfo.id, data: editRes[0] }));
        handleAlert('success', 'Successfully updated!');
      } else {
        handleAlert('error', 'Error occured while updating!');
      }
    } else {
      handleAlert(
        'warning',
        'Please have the end date after the start date or equal!'
      );
    }
  };

  const handleAlert = (type, message) => {
    setTimeout(() => {
      setAlert({ message: '', type: '', isAlert: false });
    }, 5000);
    setAlert({
      message: message,
      type: type,
      isAlert: true,
    });
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

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
      {/* Modal */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalInfo.open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalInfo.open}>
            <Box sx={style}>
              {alert.isAlert && (
                <Alert
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%,0)',
                    top: '18em',
                    width: '25em',
                  }}
                  severity={alert.type}
                >
                  {alert.message}
                </Alert>
              )}
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                backgroundColor="purple"
                padding="0.5em"
                textAlign="center"
                color="white"
                border="2px solid white"
                marginBottom="1em"
                borderRadius={'3em'}
              >
                Edit the details
              </Typography>
              <div className="input-container-modal">
                <label>Start Date</label>
                <input
                  type="date"
                  defaultValue={modalInfo.start_date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setModalInfo((prev) => {
                      return { ...prev, start_date: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="input-container-modal">
                <label>End Date</label>
                <input
                  type="date"
                  defaultValue={modalInfo.end_date}
                  min={modalInfo.start_date}
                  onChange={(e) => {
                    setModalInfo((prev) => {
                      return { ...prev, end_date: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="input-container-modal">
                <label>Reason</label>
                <input
                  type="text"
                  defaultValue={modalInfo.reason || 'Not defined'}
                  onChange={(e) =>
                    setModalInfo((prev) => {
                      return { ...prev, reason: e.target.value };
                    })
                  }
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '1em' }}>
                <button onClick={() => handleEdit()} className="edit-form-btn">
                  Save
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
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
                {PaginationFilteredData.map((row, i) => (
                  <StyledTableRow key={i}>
                    <TableCell align="center">{row.start_date}</TableCell>
                    <TableCell align="center">{row.end_date}</TableCell>
                    <TableCell align="center">{row.reason || '-'}</TableCell>
                    <TableCell align="center">
                      <div onClick={() => handleOpen(row)}>
                        <EditIcon
                          style={{ cursor: 'pointer' }}
                          fontSize="small"
                        />
                      </div>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h1 style={{ marginTop: '8em', textAlign: 'center' }}>No Data</h1>
        )}
      </div>
      {filteredLeaveData.length > 10 ? (
        <Pagination
          style={{
            marginLeft: 'auto',
            marginRight: '0',
            marginTop: '1.3em',
            width: '25em',
          }}
          count={Math.ceil(filteredLeaveData.length / 10)}
          page={page}
          color="secondary"
          onChange={handleChange}
        />
      ) : null}
    </div>
  );
};

export default EditLeave;
