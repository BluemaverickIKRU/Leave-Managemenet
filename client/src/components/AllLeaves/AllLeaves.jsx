import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import CircularProgress from '@mui/material/CircularProgress';

import LeavesTable from '../LeavesTable/LeavesTable';
import './AllLeaves.css';
import { initiateLeaveData } from '../../store/userSlice';

const AllLeaves = () => {
  const [cookie] = useCookies([]);
  const dispatch = useDispatch();

  // React State
  const [selectedTime, setSelectedTime] = useState(1);
  // eslint-disable-next-line
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  // Redux State
  const leaveData = useSelector((state) => state.user.leaveData);

  // Filtered data
  const pastLeaveData = leaveData?.filter((i) => i.start_date < todayDate);

  const upcomingLeaveData = leaveData?.filter((i) => i.start_date >= todayDate);

  const getLeave = async () => {
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
  };

  useEffect(() => {
    if (leaveData.length === 0) {
      getLeave();
    }
    // eslint-disable-next-line
  }, []);

  return leaveData.length === 0 ? (
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
      </div>
      <div style={{ textAlign: 'center' }}>
        {selectedTime === 1 ? (
          <LeavesTable leaveData={pastLeaveData} />
        ) : (
          <LeavesTable leaveData={upcomingLeaveData} />
        )}
      </div>
    </div>
  );
};

export default AllLeaves;
