import React from 'react';
import AllLeaves from '../AllLeaves/AllLeaves';

const Display = ({ selectedOption }) => {
  return selectedOption === 0 ? (
    <AllLeaves />
  ) : (
    <p>Display : {selectedOption}</p>
  );
};

export default Display;
