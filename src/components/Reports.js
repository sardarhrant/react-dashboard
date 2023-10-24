import React, { useState, useEffect, useRef } from 'react';
import UserService from '../services/UserService';
import { FixedSizeList as List } from 'react-window';
import ReportService from '../services/ReportService';
import Select from './styled-components/select';
import Button from './styled-components/button';
import ReportRow from './ReportRow';

function Reports() {
  let [reports, setReports] = useState([]);
  let [users, setUsers] = useState([]);

  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [reportUser, setReportUser] = useState('anonymous');

  const formRef = useRef(null);

  const handleReportTitleChange = (e) => {
    const value = e.target.value;
    setReportTitle(value);
  }

  const handleReportContentChange = (e) => {
    const value = e.target.value;
    setReportContent(value);
  }

  useEffect(() => {
    const fetchReports = async () => {
      const fetchedReports = await UserService.fetchReports();
      const fetchedUsers = await UserService.fetchUsers();
      setUsers(fetchedUsers);
      setReports(fetchedReports);
    }

    fetchReports();
  }, []);

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    if (userId === 'all') {
      reports = await UserService.fetchReports();
      setReports(reports);
    } else {
      const reports = await UserService.fetchUserReportById(userId);
      setReports(reports);
    }
  };

  const handleAddUserChange = (event) => {
    const userId = event.target.value;
    setReportUser(userId)
  };

  const addReport = async (e) => {
    e.preventDefault();
    formRef.current.reset();
    const reportUniqueId = Date.now();

    const newReport = {
      id: reportUniqueId,
      userId: reportUser,
      title: reportTitle,
      content: reportContent,
      dateCreated: Date.now()
    };

    try {
      const response = await ReportService.addReport(newReport)

      if (!response.ok) {
        throw new Error('Failed to add report');
      }

      console.log('Report added successfully');
      const report = await response.json();
      setReports(prevReports => [...prevReports, report]);
    } catch (error) {
      console.error('Error adding report:', error);
    }
  };

  const usersOptions = [
    { value: 'all', label: 'All Reports' },
    ...users.map(user => ({ value: user.id, label: user.name }))
  ];

  const addUserOptions = [
    { value: 'all', label: 'Anonymous' },
    ...users.map(user => ({ value: user.id, label: user.name }))
  ];


  return (
    <div className="reports">
      <div className="reports-header">
        <h2>Reports</h2>
        <div>
          <label htmlFor="user-select">Filter by user</label>
          <Select
            id='user-select'
            options={usersOptions}
            onChange={handleUserChange}
            defaultValue='all'
          />
        </div>
      </div>

      <List
        useIsScrolling
        height={390}
        itemCount={reports.length}
        itemSize={170}
        itemData={reports.map(report => ({ ...report, isEditable: false }))}
        className="report-wrapper"
      >
        {({ index, isScrolling, style, data }) => (
          <ReportRow
            isScrolling={isScrolling}
            index={index}
            style={style}
            data={data}
            isEditable={data[index].isEditable}
            updateReport={setReports}
            deleteReport={(id) => setReports(prevReports => prevReports.filter(report => report.id !== id))}
          />
        )}
      </List>

      <form className='add-record' ref={formRef}>
        <Button
          onClick={addReport}
          text="Add New Report"
          style={{
            backgroundColor: 'green',
            fontSize: '16px',
            padding: '10px',
            borderRadius: '3px',
            color: 'white',
            cursorPointer: "pointer"
          }}
        />
        <div className='add-record-controls'>
          <input onChange={handleReportTitleChange} id="report-title" type="text" placeholder='Report Title' />
          <Select
            id='user-select'
            options={addUserOptions}
            onChange={handleAddUserChange}
            defaultValue='all'
          />
        </div>
        <textarea
          rows="4"
          cols="50"
          id="report-content"
          type="text"
          placeholder='Report Content'
          onChange={handleReportContentChange} />
      </form>
    </div>
  );
}

export default Reports;
