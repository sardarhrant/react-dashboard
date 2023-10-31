import {
    CREATE_REPORT_FAILURE,
    CREATE_REPORT_REQUEST,
    CREATE_REPORT_SUCCESS,
    DELETE_REPORT_FAILURE,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    FETCH_REPORTS_FAILURE,
    FETCH_REPORTS_REQUEST,
    FETCH_REPORTS_SUCCESS,
    FILTER_REPORTS_BY_USER,
    UPDATE_REPORT_FAILURE,
    UPDATE_REPORT_REQUEST,
    UPDATE_REPORT_SUCCESS
} from "../constant";
import { reportsReducer } from './reportsReducer';

const initialState = {
    reports: [],
    fetching: false,
    error: null,
    reportsLoaded: false,
};

describe('Reports Reducer', () => {
    it('should handle CREATE_REPORT_REQUEST', () => {
        const action = { type: CREATE_REPORT_REQUEST };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: true,
        });
    });

    it('should handle CREATE_REPORT_SUCCESS', () => {
        const report = {
            "id": 1698320509558,
            "userId": 2,
            "title": "Report Title 3:41 ",
            "content": "Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 ",
            "dateCreated": 1698320509558
        };
        const action = { type: CREATE_REPORT_SUCCESS, payload: report };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            reports: [...initialState.reports, report],
        });
    });

    it('should handle CREATE_REPORT_FAILURE', () => {
        const error = 'Error message';
        const action = { type: CREATE_REPORT_FAILURE, payload: error };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            error: error,
        });
    });

    it('should handle FETCH_REPORTS_REQUEST', () => {
        const action = { type: FETCH_REPORTS_REQUEST };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: true,
            error: null,
        });
    });

    it('should handle FETCH_REPORTS_SUCCESS', () => {
        const reports = [{
            "id": 1698320509558,
            "userId": 2,
            "title": "Report Title 3:41 ",
            "content": "Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 ",
            "dateCreated": 1698320509558
        },
        {
            "id": 1698320532671,
            "userId": 10,
            "title": "Report Title 3:42 ",
            "content": "Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 ",
            "dateCreated": 1698320532671
        },
        {
            "id": 1698320567880,
            "userId": 2,
            "title": "Report Title 3:43 ",
            "content": "Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 Report Title 3:43 ",
            "dateCreated": 1698320571349
        }];
        const action = { type: FETCH_REPORTS_SUCCESS, payload: reports };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: false,
            reports: reports,
            error: null,
        });
    });

    it('should handle FETCH_REPORTS_FAILURE', () => {
        const error = 'Error message';
        const action = { type: FETCH_REPORTS_FAILURE, payload: error };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: false,
            error: error,
        });
    });

    it('should handle DELETE_REPORT_REQUEST', () => {
        const action = { type: DELETE_REPORT_REQUEST };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: true,
            error: null,
        });
    });

    it('should handle DELETE_REPORT_SUCCESS', () => {
        const reportId = 'report_id';
        const action = { type: DELETE_REPORT_SUCCESS, payload: reportId };
        const updatedReports = initialState.reports.filter(report => report.id !== reportId);
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: false,
            reports: updatedReports,
            error: null,
        });
    });

    it('should handle DELETE_REPORT_FAILURE', () => {
        const error = 'Error message';
        const action = { type: DELETE_REPORT_FAILURE, payload: error };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: false,
            error: error,
        });
    });

    it('should handle UPDATE_REPORT_REQUEST', () => {
        const action = { type: UPDATE_REPORT_REQUEST };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: true,
            error: null,
        });
    });

    it('should handle UPDATE_REPORT_SUCCESS', () => {
        const updatedReport = {
            "id": 1698320509558,
            "userId": 2,
            "title": "Report Title 3:41 ",
            "content": "Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 Report Title 3:41 ",
            "dateCreated": 1698320509558
        };
        const action = { type: UPDATE_REPORT_SUCCESS, payload: updatedReport };
        const updatedReportsArray = initialState.reports.map(report =>
            report.id === updatedReport.id ? updatedReport : report
        );
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: false,
            reports: updatedReportsArray,
            error: null,
        });
    });

    it('should handle UPDATE_REPORT_FAILURE', () => {
        const error = 'Error message';
        const action = { type: UPDATE_REPORT_FAILURE, payload: error };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            fetching: false,
            error: error,
        });
    });

    it('should handle FILTER_REPORTS_BY_USER with "all" userId', () => {
        const userId = 'all';
        const action = { type: FILTER_REPORTS_BY_USER, payload: userId };
        const newState = reportsReducer(initialState, action);
        expect(newState).toEqual({
            ...initialState,
            filteredReports: initialState.reports,
        });
    });

    it('should handle FILTER_REPORTS_BY_USER with specific userId', () => {
        const userId = 1;
        const action = { type: FILTER_REPORTS_BY_USER, payload: userId };
        const newState = reportsReducer(initialState, action);
        const filteredReports = initialState.reports.filter(report => report.userId === userId);
        expect(newState).toEqual({
            ...initialState,
            filteredReports: filteredReports,
        });
    });
});
