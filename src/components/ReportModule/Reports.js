import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import Select from '../styled-components/select';
import Button from '../styled-components/button';
import ReportRow from './ReportRow';
import { useErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector, connect } from 'react-redux';
import { createReportRequest, fetchReportsRequest, filterReportsByUser } from '../../redux/actions/reportActions';
import { fetchUsersRequest } from '../../redux/actions/userActions';
import './Reports.css'

function Reports() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const reports = useSelector(state => state.reportsReducer.filteredReports || state.reportsReducer.reports);
  const usersLoaded = useSelector(state => state.usersReducer.usersLoaded);
  const reportsLoaded = useSelector(state => state.reportsReducer.reportsLoaded);
  const [reportTitle, setReportTitle] = useState('');
  const [reportContent, setReportContent] = useState('');
  const [reportUser, setReportUser] = useState('anonymous');
  const { showBoundary } = useErrorBoundary();
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
    if (!reportsLoaded) {
      dispatch(fetchReportsRequest());
    }

    if (!usersLoaded) {
      dispatch(fetchUsersRequest());
    }
  }, [dispatch, usersLoaded, reportsLoaded]);

  const handleUserChange = (event) => {
    const userId = +event.target.value || 'all';
    dispatch(filterReportsByUser(userId));
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
      userId: +reportUser,
      title: reportTitle,
      content: reportContent,
      dateCreated: Date.now()
    };

    try {
      dispatch(createReportRequest(newReport));
      console.log('Report added successfully');
    } catch (error) {
      showBoundary(error);
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
        <div className="filter-reports">
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
        itemData={reports?.map(report => ({ ...report, isEditable: false }))}
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
          id="report-content"
          type="text"
          placeholder='Report Content'
          onChange={handleReportContentChange} />
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    reports: state.reportsReducer.reports,
  };
};

export default connect(mapStateToProps)(Reports);
