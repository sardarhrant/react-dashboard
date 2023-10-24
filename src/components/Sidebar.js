import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav id="sidebar">
        <NavLink to="/users">
          {({ isActive }) => (
            <span className={isActive ? "active" : ""}>Users</span>
          )}
        </NavLink>
        <NavLink to="/reports">
          {({ isActive }) => (
            <span className={isActive ? "active" : ""}>Reports</span>
          )}
        </NavLink>
        <NavLink to="/analytics">
          {({ isActive }) => (
            <span className={isActive ? "active" : ""}>Analytics</span>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
