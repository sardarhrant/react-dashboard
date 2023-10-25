import {
    DELETE_REPORT_REQUEST,
    FETCH_REPORTS_SUCCESS,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAILURE,
    UPDATE_REPORT_REQUEST,
    UPDATE_REPORT_SUCCESS,
    UPDATE_REPORT_FAILURE,
    FILTER_REPORTS_BY_USER
} from "../constant";

export const fetchReportsRequest = () => {
    return {
        type: 'FETCH_REPORTS_REQUEST',
    };
};

export const fetchReportsSuccess = (reports) => {
    return {
        type: FETCH_REPORTS_SUCCESS,
        payload: reports,
    };
};

export const fetchReportsFailure = (error) => {
    return {
        type: 'FETCH_REPORTS_FAILURE',
        payload: error,
    };
};

export const deleteReportRequest = () => {
    return {
        type: DELETE_REPORT_REQUEST,
    };
};

export const deleteReportSuccess = (reportId) => {
    return {
        type: DELETE_REPORT_SUCCESS,
        payload: reportId,
    };
};

export const deleteReportFailure = (error) => {
    return {
        type: DELETE_REPORT_FAILURE,
        payload: error,
    };
};

export const updateReportRequest = () => {
    return {
        type: UPDATE_REPORT_REQUEST,
    };
};

export const updateReportSuccess = (updatedReport) => {
    return {
        type: UPDATE_REPORT_SUCCESS,
        payload: updatedReport,
    };
};

export const updateReportFailure = (error) => {
    return {
        type: UPDATE_REPORT_FAILURE,
        payload: error,
    };
};

export const filterReportsByUser = (userId) => {
    return {
        type: FILTER_REPORTS_BY_USER,
        payload: userId,
    };
};