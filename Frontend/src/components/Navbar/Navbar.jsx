import React from 'react';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">Project</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Task</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Leads</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Payment</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Monitoring</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Subscription</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Analytics</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Books</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Setting</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">News Letter</a>
        </li>
      {/* add the tab icons later*/}
      </ul>
    </nav>
  );
};

export default Navbar;
