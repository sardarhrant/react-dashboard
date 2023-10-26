import {
    DELETE_REPORT_REQUEST,
    FETCH_REPORTS_SUCCESS,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAILURE,
    UPDATE_REPORT_REQUEST,
    UPDATE_REPORT_SUCCESS,
    UPDATE_REPORT_FAILURE,
    FILTER_REPORTS_BY_USER,
    FETCH_REPORTS_REQUEST,
    CREATE_REPORT_REQUEST,
    CREATE_REPORT_SUCCESS,
    CREATE_REPORT_FAILURE
} from "../constant";

export const createReportRequest = (newReport) => {
    return {
        type: CREATE_REPORT_REQUEST,
        payload: newReport,
    };
};

export const createReportSuccess = (newReport) => {
    return {
        type: CREATE_REPORT_SUCCESS,
        payload: newReport,
    };
};

export const createReportFailure = (error) => {
    return {
        type: CREATE_REPORT_FAILURE,
        payload: error,
    };
};

export const fetchReportsRequest = () => {
    return {
        type: FETCH_REPORTS_REQUEST,
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

export const deleteReportRequest = (reportId) => {
    return {
        type: DELETE_REPORT_REQUEST,
        payload: reportId
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

export const updateReportRequest = (updatedReport) => {
    return {
        type: UPDATE_REPORT_REQUEST,
        payload: updatedReport
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