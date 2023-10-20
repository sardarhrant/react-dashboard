import React, { useState, useEffect } from 'react';

function Reports() {
  console.log('init Reports')
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/reports')
      .then(response => response.json())
      .then(data => setReports(data));
  }, []);

  return (
    <div className="reports">
      <h2>Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id}>{report.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
