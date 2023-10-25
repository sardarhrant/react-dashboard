import React, { useState, useRef } from 'react';
import ReportService from '../services/ReportService';
import Button from './styled-components/button';
import { useErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector, connect } from 'react-redux';
import { deleteReportFailure, deleteReportSuccess, updateReportFailure, updateReportSuccess } from '../redux/actions/reportActions';

const ReportRow = ({ index, isScrolling, style, data }) => {
    const { showBoundary } = useErrorBoundary();
    const report = data[index];
    const [isEditable, setIsEditable] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const dispatch = useDispatch();

    const toggleEdit = () => {
        setIsEditable(prev => !prev);
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

    const deleteReportById = async (reportId) => {
        try {
            const response = await ReportService.deleteReport(reportId)

            if (!response.ok) {
                throw new Error('Failed to delete report');
            }

            console.log('Report deleted successfully');
            dispatch(deleteReportSuccess(reportId));
        } catch (error) {
            showBoundary(error);
            dispatch(deleteReportFailure(error.message));
            console.error('Error deleting report:', error);
        }
    }

    const editReport = async () => {
        setIsEditable(prev => !prev);

        if (!isEditable) {
            return;
        }

        const title = titleRef.current.value;
        const content = contentRef.current.value;

        const updatedReport = {
            ...report,
            title: editedTitle || title,
            content: editedContent || content,
            dateUpdated: Date.now()
        };

        try {
            const response = await ReportService.updateReport(report.id, updatedReport)

            if (!response.ok) {
                throw new Error('Failed to update report');
            }

            console.log('Report updated successfully');
            dispatch(updateReportSuccess(updatedReport));
        } catch (error) {
            showBoundary(error);
            dispatch(updateReportFailure(error.message));
            console.error('Error updating report:', error);
        }

    }

    return (
        <div className='report-item' style={style}>
            {!isScrolling && <span className='date'>Date: {formatDate(report?.dateUpdated || report.dateCreated)}</span>}
            <div className='report-item-controls'>
                <Button
                    onClick={editReport}
                    text={!isEditable ? 'Edit' : 'Save'}
                    style={{
                        backgroundColor: '#28a745',
                        fontSize: '16px',
                        padding: '4px 6px',
                        borderRadius: '3px',
                        color: 'white',
                    }}
                />

                {isEditable && <Button
                    onClick={toggleEdit}
                    text="Cancel"
                    style={{
                        backgroundColor: '#ffc107',
                        fontSize: '16px',
                        padding: '4px 6px',
                        borderRadius: '3px',
                        color: '#fff',
                    }}
                />
                }

                <Button
                    onClick={() => deleteReportById(report?.id)}
                    text="Delete"
                    style={{
                        backgroundColor: '#dc3545',
                        fontSize: '16px',
                        padding: '4px 6px',
                        borderRadius: '3px',
                        color: 'white',
                    }}
                />
            </div>
            {!isEditable
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

export default ReportRow;