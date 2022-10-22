import React, { useState } from 'react';

import './AllLeaves.css';

const AllLeaves = () => {
  // React State
  const [selectedTime, setSelectedTime] = useState(1);

  return (
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
          <h1>Welcome to past</h1>
        ) : (
          <h1>Welcome to Future</h1>
        )}
      </div>
    </div>
  );
};

export default AllLeaves;
