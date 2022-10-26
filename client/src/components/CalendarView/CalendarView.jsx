import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const CalendarView = () => {
  const leaveData = useSelector((state) => state.user.leaveData);

  const localizer = momentLocalizer(moment);

  const updatedLeaveData = leaveData.map((i) => {
    return {
      ...i,
      start: new Date(i.start_date),
      end: new Date(i.end_date),
      title: i.reason || 'Not Specified',
    };
  });

  return (
    <Calendar
      localizer={localizer}
      events={updatedLeaveData}
      startAccessor="start"
      endAccessor="end"
      defaultDate={moment().toDate()}
      style={{ height: '100vh' }}
    />
  );
};

export default CalendarView;
