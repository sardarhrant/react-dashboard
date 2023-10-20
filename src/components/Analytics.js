import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function Analytics() {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/reports')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setReportData(data)
      });
  }, []);


  // Sample data
  const data = [
    { name: 'Geeksforgeeks', students: 400 },
    { name: 'Technical scripter', students: 700 },
    { name: 'Geek-i-knack', students: 200 },
    { name: 'Geek-o-mania', students: 1000 }
  ];


  return (
    <>
      <h2>Analytics</h2>
      <BarChart width={600} height={600} data={data}>
        <Bar dataKey="students" fill="green" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </BarChart></>
  );

  // return (
  //   <div className="analytics">
  //     <h2>Analytics</h2>
  //     <BarChart width={600} height={300} data={reportData}>
  //       <Bar dataKey="dateCreated" fill="green" />
  //       <CartesianGrid stroke="#ccc" />
  //       <XAxis dataKey="dateCreated" />
  //       <YAxis />
  //       <Tooltip />
  //     </BarChart>
  //   </div>
  // );
}

export default Analytics;
