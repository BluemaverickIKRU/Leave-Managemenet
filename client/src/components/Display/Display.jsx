import React from 'react';

import AllLeaves from '../AllLeaves/AllLeaves';
import CreateLeave from '../CreateLeave/CreateLeave';
import EditLeave from '../EditLeave/EditLeave';
import CalendarView from '../CalendarView/CalendarView';

const Display = ({ selectedOption }) => {
  return selectedOption === 0 ? (
    <AllLeaves />
  ) : selectedOption === 1 ? (
    <CalendarView />
  ) : selectedOption === 2 ? (
    <CreateLeave />
  ) : selectedOption === 3 ? (
    <EditLeave />
  ) : null;
};

export default Display;
