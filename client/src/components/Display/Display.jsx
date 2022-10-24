import React from 'react';
import AllLeaves from '../AllLeaves/AllLeaves';
import CreateLeave from '../CreateLeave/CreateLeave';
import EditLeave from '../EditLeave/EditLeave';

const Display = ({ selectedOption }) => {
  return selectedOption === 0 ? (
    <AllLeaves />
  ) : selectedOption === 2 ? (
    <CreateLeave />
  ) : selectedOption === 3 ? (
    <EditLeave />
  ) : (
    <p>Display : {selectedOption}</p>
  );
};

export default Display;
