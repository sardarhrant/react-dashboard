import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { fetchReportsSuccess } from '../../redux/actions/reportActions';
import ReportService from '../../services/ReportService';


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
  const dispatch = useDispatch();
  const reports = useSelector(state => state.reportsReducer.reports);
  const reportsLoaded = useSelector(state => state.reportsReducer.reportsLoaded);
  const chartContentRef = useRef(null);
  const [barCharttWidth, setBarCharttWidth] = useState(null);

  useEffect(() => {
    if (!reportsLoaded) {
      ReportService.fetchReports().then(reports => {
        dispatch(fetchReportsSuccess(reports));
      });
    }

    const measureElement = () => {
      if (chartContentRef.current) {
        const width = chartContentRef.current.offsetWidth;
        setBarCharttWidth(width);
      }
    };

    measureElement();

    const handleResize = () => {
      measureElement();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, reportsLoaded]);

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
    <div ref={chartContentRef}>
      <h2>Monthly Reports</h2>
      <BarChart width={barCharttWidth - 20} height={300} data={userChartData}>
        <Bar dataKey="reportsCount" fill="red" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="userId" />
        <YAxis />
        <Tooltip content={<CustomTooltip labels={[{ dataKey: 'userId', label: 'User ID' }, { dataKey: 'reportsCount', label: 'Report Count' }]} />} />
      </BarChart>

      <h2>User Reports</h2>
      <BarChart width={barCharttWidth - 20} height={300} data={monthlyChartData}>
        <Bar dataKey="reportsCount" fill="blue" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip content={<CustomTooltip labels={[{ dataKey: 'monthYear', label: 'Month Year' }, { dataKey: 'reportsCount', label: 'Report Count' }]} />} />
      </BarChart>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    reports: state.reportsReducer.reports,
  };
};

export default connect(mapStateToProps)(Analytics);
