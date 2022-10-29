import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import LeavesTable from '../LeavesTable/LeavesTable';
import './AllLeaves.css';
import { initiateLeaveData } from '../../store/userSlice';

const AllLeaves = () => {
  const [cookie] = useCookies([]);
  const dispatch = useDispatch();

  // React State
  const [selectedTime, setSelectedTime] = useState(1);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState();
  const [filterValue, setFilterValue] = useState('');
  const [customDateFilter, setCustomDateFilter] = useState();

  // Redux State
  const leaveData = useSelector((state) => state.user.leaveData);

  // Filtered data
  const pastLeaveData = leaveData?.filter((i) => i.start_date < todayDate);

  const upcomingLeaveData = leaveData?.filter((i) => i.start_date >= todayDate);

  const filteredLeaveData = filterValue
    ? // eslint-disable-next-line
      leaveData.filter((i) => {
        if (filterValue === 'Current') {
          if (i.start_date.slice(0, 7) === todayDate.slice(0, 7)) {
            return i;
          }
        } else if (filterValue === 'Last month') {
          const date = new Date();
          const month = date.getMonth();
          date.setMonth(month - 1);
          if (i.start_date.slice(0, 7) === date.toISOString().slice(0, 7)) {
            return i;
          }
        } else {
          if (filterValue > todayDate) {
            if (i.start_date >= todayDate && i.start_date <= filterValue) {
              return i;
            }
          } else {
            if (i.start_date <= todayDate && i.start_date >= filterValue) {
              return i;
            }
          }
        }
      })
    : leaveData;

  const getLeave = async () => {
    setLoading(true);
    const allLeavesReq = fetch(
      'https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves?select=*',
      {
        headers: {
          apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg`,
          Authorization: `Bearer ${cookie.accessToken}`,
        },
      }
    );
    const allLeavesRes = await (await allLeavesReq).json();
    dispatch(initiateLeaveData(allLeavesRes));
    setLoading(false);
  };

  const handleFilter = () => {
    setSelectedTime(3);
    setOpen(true);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FBE9FC',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '1em',
  };

  const handleClose = () => setOpen(false);

  const handleFilterCustomDate = (e) => {
    setCustomDateFilter(e.target.value);
  };

  const handleFilterByDefaultValue = () => {
    if (options === '') {
      setFilterValue('');
    } else if (options === 'Current') {
      setFilterValue('Current');
    } else if (options === '1') {
      setFilterValue('Last month');
    } else if (options === '6' || options === '12') {
      const date = new Date();
      const currentMonth = date.getMonth();
      date.setMonth(currentMonth - Number(options));
      setFilterValue(date.toISOString().slice(0, 10));
    }
    handleClose();
  };

  const handleSubmitCustomDate = () => {
    setFilterValue(customDateFilter);
    handleClose();
  };

  useEffect(() => {
    if (leaveData.length === 0) {
      getLeave();
    }
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <div
      style={{
        margin: '0 auto',
        width: 'fit-content',
        marginTop: '20em',
        textAlign: 'center',
      }}
    >
      <CircularProgress color="secondary" style={{ width: 50, height: 50 }} />
      <p>Loading...Please be patient</p>
    </div>
  ) : leaveData.length === 0 ? (
    <div>
      <p
        style={{
          margin: '0.5em',
          color: 'purple',
          fontSize: '2rem',
          borderBottom: '3px solid',
          width: '8em',
        }}
      >
        View all leaves
      </p>
      <h3 style={{ textAlign: 'center', marginTop: '15em' }}>
        No leave applied!
      </h3>
    </div>
  ) : (
    <div className="AllLeavesContainer">
      <p
        style={{
          margin: '0.5em',
          color: 'purple',
          fontSize: '2rem',
          borderBottom: '3px solid',
          width: '8em',
        }}
      >
        View all leaves
      </p>
      <div className="time-btn-container">
        <button
          style={{
            backgroundColor: selectedTime === 1 ? 'purple' : null,
            color: selectedTime === 1 ? 'white' : null,
            border: selectedTime === 1 ? '2px solid white' : null,
          }}
          onClick={() => setSelectedTime(1)}
          className="time-btns"
        >
          Past
        </button>
        <button
          style={{
            backgroundColor: selectedTime === 2 ? 'purple' : null,
            color: selectedTime === 2 ? 'white' : null,
            border: selectedTime === 2 ? '2px solid white' : null,
          }}
          onClick={() => setSelectedTime(2)}
          className="time-btns"
        >
          Upcoming
        </button>
        <button
          style={{
            backgroundColor: selectedTime === 3 ? 'purple' : null,
            color: selectedTime === 3 ? 'white' : null,
            border: selectedTime === 3 ? '2px solid white' : null,
          }}
          onClick={() => handleFilter()}
          className="time-btns"
        >
          Filter
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>
        {selectedTime === 1 ? (
          <LeavesTable leaveData={pastLeaveData} />
        ) : selectedTime === 2 ? (
          <LeavesTable leaveData={upcomingLeaveData} />
        ) : (
          <LeavesTable leaveData={filteredLeaveData} />
        )}
      </div>
      {/* Modal for filter */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Filter Options
            </Typography>
            <div style={{ textAlign: 'center', margin: '1em' }}>
              <label style={{ margin: '1em' }}>Default options</label>
              <select
                style={{
                  margin: '1em',
                  border: '2px solid',
                  borderRadius: '5em',
                }}
                name="filter-dates"
                id="filter-dates"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
              >
                <option value="">None</option>
                <option value="Current">Current month</option>
                <option value="1">Last month</option>
                <option value="6">Last 6 months</option>
                <option value="12">Last 1 year</option>
              </select>
              <button
                style={{
                  backgroundColor: 'purple',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '5em',
                  padding: '0.2em 1em',
                }}
                onClick={() => handleFilterByDefaultValue()}
              >
                Filter
              </button>
            </div>
            <hr />
            <div style={{ textAlign: 'center', margin: '1em' }}>
              <label style={{ margin: '1em' }}>Custom date</label>
              <input
                style={{
                  margin: '1em',
                  border: '2px solid',
                  borderRadius: '5em',
                }}
                type="date"
                onChange={handleFilterCustomDate}
              />
              <button
                style={{
                  backgroundColor: 'purple',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '5em',
                  padding: '0.2em 1em',
                }}
                onClick={() => handleSubmitCustomDate()}
              >
                Filter
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AllLeaves;
