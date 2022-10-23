import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './CreateLeave.css';

const CreateLeave = () => {
  // React State
  const [leaveInfo, setLeaveInfo] = useState({
    start_date: '',
    end_date: '',
    reason: '',
  });

  const handleSubmit = () => {
    const start_date = new Date(leaveInfo.start_date);
    const end_date = new Date(leaveInfo.end_date);
    start_date.setDate(start_date.getDate() + 1);
    end_date.setDate(end_date.getDate() + 1);
    console.log(
      start_date.toISOString().slice(0, 10),
      end_date.toISOString().slice(0, 10)
    );
  };

  return (
    <div>
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
          <div>
            <label>Start Date</label>
            <DatePicker
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
          <div>
            <label>End Date</label>
            <DatePicker
              dateFormat={'yyyy-MM-dd'}
              selected={leaveInfo.end_date}
              onChange={(date) =>
                setLeaveInfo((prev) => {
                  return { ...prev, end_date: date };
                })
              }
            />
          </div>
          <TextField
            variant="outlined"
            value={leaveInfo.reason}
            label="Reason"
            onChange={(e) =>
              setLeaveInfo((prev) => {
                return { ...prev, reason: e.target.value };
              })
            }
          />
          <Button
            style={{ width: '10em', margin: '0.5em auto' }}
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
