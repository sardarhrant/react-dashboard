import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import { FixedSizeList as List } from 'react-window';

function Reports() {
  let [reports, setReports] = useState([]);
  let [users, setUsers] = useState([]);

  const ReportRow = ({ index, isScrolling, style, data }) => {
    const report = data[index];
    return (
      <div className='report-item' style={style}>
        {isScrolling ? <span>LOADING...</span> : report.title}
      </div>
    );
  };


  useEffect(() => {
    const fetchReports = async () => {
      reports = await UserService.fetchReports();
      users = await UserService.fetchUsers();
      setUsers(users)
      setReports(reports);
    }

    fetchReports();
  }, []);

  const handleChange = async (event) => {
    const userId = event.target.value;
    if (userId === 'all') {
      reports = await UserService.fetchReports();
      setReports(reports);
    } else {
      const reports = await UserService.fetchUserReportById(userId);
      setReports(reports);
    }
  };

  return (
    <div className="reports">
      <div className="reports-header">
        <h2>Reports</h2>
        <div>
          <label htmlFor="user-select">Filter by user</label>
          <select onChange={handleChange} id='user-select'>
            <option value="all">All Reports</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      </div>

      <List
        useIsScrolling
        height={450}
        itemCount={reports.length}
        itemSize={35}
        itemData={reports}
        className="report-wrapper"
      >
        {ReportRow}
      </List>
    </div>
  );
}

export default Reports;
