import React, { useState, useEffect, useRef } from 'react';
import UserService from '../services/UserService';
import { FixedSizeList as List } from 'react-window';
import ReportService from '../services/ReportService';

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

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'long',
    };

    const formattedDate = new Date(dateString).toLocaleString('en-US', options);
    return formattedDate;
  };


  const ReportRow = ({ index, isScrolling, style, data }) => {
    const report = data[index];
    const [isEditable, setIsEditable] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    const titleRef = useRef(null);
    const contentRef = useRef(null);

    const toggleEdit = () => {
      setIsEditable(prev => !prev);
    }

    const editReport = async () => {
      setIsEditable(prev => !prev);

      if (!isEditable) {
        return;
      }

      const title = titleRef.current.value;
      const content = contentRef.current.value;

      const updateReport = {
        ...report,
        title: editedTitle || title,
        content: editedContent || content,
        dateUpdated: Date.now()
      };

      try {
        const response = await ReportService.updateReport(report.id, updateReport)

        if (!response.ok) {
          throw new Error('Failed to update report');
        }

        console.log('Report updated successfully');
        setReports(prevReports => prevReports.map(prevReport =>
          prevReport.id === report.id ? updateReport : prevReport
        ));
      } catch (error) {
        console.error('Error updating report:', error);
      }

    }

    return (
      <div className='report-item' style={style}>
        {!isScrolling && <span className='date'>Date: {formatDate(report?.dateUpdated || report.dateCreated)}</span>}
        <div className='report-item-controls'>
          <span className='edit' onClick={editReport}>{!isEditable ? 'Edit' : 'Save'}</span>
          {isEditable && <span className='cancel' onClick={toggleEdit}>Cancel</span>}
          <span className='delete' onClick={() => deleteReport(report?.id)}>Delete</span>
        </div>
        {
          !isEditable
            ? <>
              {isScrolling ? <span className='loading-report'>LOADING...</span> : report.title}
              {!isScrolling && <p>{report?.content}</p>}
            </>
            :
            <div className='edit-controls'>
              <input
                ref={titleRef}
                onChange={(e) => setEditedTitle(e.target.value)}
                type='text'
                defaultValue={report.title}
              />
              <p>
                <textarea
                  ref={contentRef}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={5}
                  className='editable-textArea'
                  type='text'
                  defaultValue={report?.content}
                />
              </p>
            </div>
        }
      </div>
    );
  };


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



  const deleteReport = async (id) => {
    try {
      const response = await ReportService.deleteReport(id)

      if (!response.ok) {
        throw new Error('Failed to delete report');
      }

      console.log('Report deleted successfully');
      reports = reports.filter((report) => report.id !== id)
      setReports(reports);
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  }


  return (
    <div className="reports">
      <div className="reports-header">
        <h2>Reports</h2>
        <div>
          <label htmlFor="user-select">Filter by user</label>
          <select onChange={handleUserChange} id='user-select'>
            <option value="all">All Reports</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
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
          />
        )}
      </List>

      <form className='add-record' ref={formRef}>
        <button onClick={addReport}>Add New Report</button>
        <div className='add-record-controls'>
          <input onChange={handleReportTitleChange} id="report-title" type="text" placeholder='Report Title' />
          <select onChange={handleAddUserChange} id='user-select'>
            <option value="all">Anonymous</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
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
