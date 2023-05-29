import React from 'react';
import './Tab.css'; // Import your CSS file for styling

const Tab = () => {
  return (
   <div className="tabs">
    <div className="tabItem">Inventory</div>
    <div className="tabItem">Items</div>
    <div className="tabItem">Expenses</div>
   </div>
  );
};

export default Tab;
