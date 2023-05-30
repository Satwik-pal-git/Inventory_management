import React from 'react';
import './Tab.css'; // Import your CSS file for styling
import { BiStoreAlt } from "react-icons/bi";
import { TbBuildingBank, TbBuilding } from "react-icons/tb";

const Tab = () => {
  return (
   <div className="tabs">
    <div className="tabItem"><div className="icon"><BiStoreAlt/></div> Inventory</div>
    <div className="tabItem"><div className="icon"><TbBuilding/></div>Items</div>
    <div className="tabItem"> <div className="icon"><TbBuildingBank/></div>  Expenses</div>
   </div>
  );
};

export default Tab;
