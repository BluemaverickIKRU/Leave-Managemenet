import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';

import './Sidemenu.css';
import { logOnOrOff } from '../../store/userSlice';

const Sidemenu = ({ selectedOption, setSelectedOption }) => {
  const options = ['Your leaves', 'Calendar', 'Create leave', 'Edit Leave'];

  const dispatch = useDispatch();

  // Redux State
  const userInfo = useSelector((state) => state.user.userInfo);

  const logout = () => {
    dispatch(logOnOrOff(false));
  };

  return (
    <div>
      <div className="userInfoDiv">
        <p>
          Hi, <span style={{ fontWeight: '600' }}>{userInfo.name}!</span>
        </p>
        <p>{userInfo.email}</p>
      </div>
      <hr style={{ width: '80%', margin: '0 auto', marginBottom: '1em' }} />
      <div className="option-menu">
        {options.map((option, i) => {
          return (
            <p
              style={{
                borderRadius: '20em',
                width: '90%',
                margin: '0 auto',
                padding: '0.3em',
                cursor: 'pointer',
                backgroundColor: selectedOption === i ? 'purple' : '',
                color: selectedOption === i ? 'white' : 'black',
                textAlign: 'center',
              }}
              key={i}
              onClick={() => {
                setSelectedOption(i);
              }}
            >
              {option}
            </p>
          );
        })}
      </div>
      <div className="logout-btn-sidemenu">
        <Button
          onClick={() => logout()}
          size="small"
          style={{ backgroundColor: 'purple' }}
          variant="contained"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidemenu;
