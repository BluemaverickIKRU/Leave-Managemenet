import React, { useState } from 'react';

import Sidemenu from '../../components/SideMenu/Sidemenu';
import Display from '../../components/Display/Display';
import './Dashboard.css';

const Dashboard = () => {
  //   React State
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="dashboard-container">
      <div className="sideMenu-Container">
        <Sidemenu
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className="display-Container">
        <Display selectedOption={selectedOption} />
      </div>
    </div>
  );
};

export default Dashboard;
