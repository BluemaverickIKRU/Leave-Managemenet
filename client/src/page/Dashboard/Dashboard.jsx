import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const userName = useSelector((state) => state.user.userInfo.name);

  return <div>Welcome {userName}</div>;
};

export default Dashboard;
