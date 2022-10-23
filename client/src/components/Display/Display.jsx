import React from 'react';
import AllLeaves from '../AllLeaves/AllLeaves';
import CreateLeave from '../CreateLeave/CreateLeave';

const Display = ({ selectedOption }) => {
  return selectedOption === 0 ? (
    <AllLeaves />
  ) : selectedOption === 2 ? (
    <CreateLeave />
  ) : (
    <p>Display : {selectedOption}</p>
  );
};

export default Display;
