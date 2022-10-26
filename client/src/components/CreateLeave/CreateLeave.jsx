import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

import './CreateLeave.css';
import { updateLeaveData } from '../../store/userSlice';

const CreateLeave = () => {
  // Cookies
  const [cookie] = useCookies([]);

  const dispatch = useDispatch();

  // React State
  const [leaveInfo, setLeaveInfo] = useState({
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [alert, setAlert] = useState({
    message: '',
    isAlert: false,
    type: '',
  });

  const handleSubmit = async () => {
    if (leaveInfo.start_date !== '' && leaveInfo.end_date !== '') {
      let start_date = new Date(leaveInfo.start_date);
      let end_date = new Date(leaveInfo.end_date);
      start_date.setDate(start_date.getDate() + 1);
      end_date.setDate(end_date.getDate() + 1);
      start_date = start_date.toISOString().slice(0, 10);
      end_date = end_date.toISOString().slice(0, 10);
      if (
        start_date >= new Date().toISOString().slice(0, 10) &&
        end_date >= new Date().toISOString().slice(0, 10)
      ) {
        const createLeaveReq = await fetch(
          'https://dkgicggupnrxldwvkeft.supabase.co/rest/v1/leaves',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ2ljZ2d1cG5yeGxkd3ZrZWZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwMDI4ODMsImV4cCI6MTk4MTU3ODg4M30.BLLinQ9VEK8_T-JE22WOidlJs_0TFhOb1n3zkSVc7eg`,
              Authorization: `Bearer ${cookie.accessToken}`,
              Prefer: 'return=representation',
            },
            body: JSON.stringify({
              start_date: start_date,
              end_date: end_date,
              reason: leaveInfo.reason,
            }),
          }
        );
        setLeaveInfo({ start_date: '', end_date: '', reason: '' });
        const createLeaveRes = await createLeaveReq.json();
        dispatch(updateLeaveData(createLeaveRes[0]));
        handleAlert('success', 'Successfully applied leave!');
      } else {
        handleAlert(
          'warning',
          `Start date and End date should be equal or greater than ${new Date()
            .toISOString()
            .slice(0, 10)}!`
        );
      }
    } else {
      handleAlert('error', 'Please enter a start date and end date!');
    }
  };

  const handleAlert = (type, message) => {
    setTimeout(() => {
      setAlert({ isAlert: false });
    }, 5000);
    setAlert({ isAlert: true, message: message, type: type });
  };

  return (
    <div style={{ position: 'relative' }}>
      {alert.isAlert ? (
        <Alert
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '40em',
            top: '4em',
          }}
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      ) : null}
      <p
        style={{
          margin: '0.5em',
          color: 'purple',
          fontSize: '2rem',
          borderBottom: '3px solid',
          width: '9em',
        }}
      >
        Leave application
      </p>
      <div className="create-leave-form">
        <div className="create-leave-illustration">
          <img
            src="https://media.istockphoto.com/vectors/clipboard-with-checklist-vector-id913685766?k=20&m=913685766&s=612x612&w=0&h=WTlO5hnPCU0DLydSvnwXAEGoL7R0QNRo1z-Zph3aH4Y="
            alt="Form illustration"
            width="150px"
          />
        </div>
        <div className="create-leave-form-container">
          <div className="date-picker-container">
            <label>Start Date</label>
            <DatePicker
              minDate={new Date()}
              placeholderText="YYYY / MM / DD"
              className="date-picker"
              dateFormat={'yyyy-MM-dd'}
              selected={leaveInfo.start_date}
              onChange={(date) =>
                setLeaveInfo((prev) => {
                  return {
                    ...prev,
                    start_date: date,
                  };
                })
              }
            />
          </div>
          <div className="date-picker-container">
            <label>End Date</label>
            <DatePicker
              minDate={leaveInfo.start_date}
              placeholderText="YYYY / MM / DD"
              className="date-picker"
              dateFormat={'yyyy-MM-dd'}
              selected={leaveInfo.end_date}
              onChange={(date) =>
                setLeaveInfo((prev) => {
                  return { ...prev, end_date: date };
                })
              }
            />
          </div>
          <div className="date-picker-container">
            <label className="create-leave-reason-label">Reason</label>
            <input
              value={leaveInfo.reason}
              onChange={(e) =>
                setLeaveInfo((prev) => {
                  return { ...prev, reason: e.target.value };
                })
              }
              type="text"
              placeholder="Your reason"
            />
          </div>
          <Button
            style={{
              width: '10em',
              margin: '1em auto',
              backgroundColor: 'purple',
              color: 'white',
              border: '2px solid white',
              borderRadius: '10em',
            }}
            variant="outlined"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateLeave;
