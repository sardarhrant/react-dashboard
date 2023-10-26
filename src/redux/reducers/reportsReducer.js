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

const initialState = {
    reports: [],
    fetching: false,
    error: null,
    reportsLoaded: false,
};

export function reportsReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_REPORT_REQUEST:
            return {
                ...state,
                fetching: true,
            }
        case CREATE_REPORT_SUCCESS:
            return {
                ...state,
                reports: [...state.reports, action.payload],
            }
        case CREATE_REPORT_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case FETCH_REPORTS_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case FETCH_REPORTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                reports: action.payload,
                error: null,
            };
        case FETCH_REPORTS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            };
        case DELETE_REPORT_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case DELETE_REPORT_SUCCESS:
            const updatedReports = state.reports.filter(report => report.id !== action.payload);
            return {
                ...state,
                fetching: false,
                reports: updatedReports,
                error: null,
            };
        case DELETE_REPORT_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            };
        case UPDATE_REPORT_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case UPDATE_REPORT_SUCCESS:
            const updatedReportsArray = state.reports.map(report =>
                report.id === action.payload.id ? action.payload : report
            );
            return {
                ...state,
                fetching: false,
                reports: updatedReportsArray,
                error: null,
            };
        case UPDATE_REPORT_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            };
        case FILTER_REPORTS_BY_USER:
            const userId = action.payload;
            if (userId === 'all') {
                return {
                    ...state,
                    filteredReports: state.reports,
                };
            } else {
                const filteredReports = state.reports.filter(report => report.userId === userId);
                return {
                    ...state,
                    filteredReports,
                };
            }
        default:
            return state;
    }
}