import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


const CustomTooltip = ({ active, payload, labels }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {labels.map(label => (
          <p key={label.dataKey}>{`${label.label}: ${payload[0].payload[label.dataKey]}`}</p>
        ))}
      </div>
    );
  }

  return null;
};


function Analytics() {
  const [reports, setReports] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetch('http://localhost:8080/reports')
      .then(response => response.json())
      .then(data => {
        setReports(data)
      });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const monthlyReportCounts = {};
  reports.forEach(report => {
    const date = new Date(report.dateCreated);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    monthlyReportCounts[monthYear] = (monthlyReportCounts[monthYear] || 0) + 1;
  });

  const userReportCounts = {};
  reports.forEach(report => {
    userReportCounts[report.userId] = (userReportCounts[report.userId] || 0) + 1;
  });

  const monthlyChartData = Object.keys(monthlyReportCounts).map(monthYear => ({
    monthYear,
    reportsCount: monthlyReportCounts[monthYear],
  }));

  const userChartData = Object.keys(userReportCounts).map(userId => ({
    userId,
    reportsCount: userReportCounts[userId],
  }));


  return (
    <>
      <h2>Monthly Reports</h2>
      <BarChart width={windowWidth - 440} height={300} data={userChartData}>
        <Bar dataKey="reportsCount" fill="red" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="userId" />
        <YAxis />
        <Tooltip content={<CustomTooltip labels={[{ dataKey: 'userId', label: 'User ID' }, { dataKey: 'reportsCount', label: 'Report Count' }]} />} />
      </BarChart>

      <h2>User Reports</h2>
      <BarChart width={windowWidth - 440} height={300} data={monthlyChartData}>
        <Bar dataKey="reportsCount" fill="blue" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip content={<CustomTooltip labels={[{ dataKey: 'monthYear', label: 'Month Year' }, { dataKey: 'reportsCount', label: 'Report Count' }]} />} />
      </BarChart>
    </>
  );
};

export default Analytics;
