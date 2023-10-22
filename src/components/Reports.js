import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';

function Reports() {
  let [reports, setReports] = useState([]);
  let [users, setUsers] = useState([]);

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
      <ul>
        {reports.map(report => (
          <li key={report.id}>{report.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
