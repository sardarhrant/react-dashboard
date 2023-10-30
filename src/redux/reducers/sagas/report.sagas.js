import { call, put, takeLatest } from 'redux-saga/effects';
import { createReportFailure, createReportSuccess, deleteReportFailure, deleteReportSuccess, fetchReportsFailure, fetchReportsSuccess, updateReportFailure, updateReportSuccess } from '../../actions/reportActions';
import { CREATE_REPORT_REQUEST, DELETE_REPORT_REQUEST, FETCH_REPORTS_REQUEST, UPDATE_REPORT_REQUEST } from '../../constant';
import ReportService from '../../../services/ReportService';

export function* fetchReports(action) {
    try {
        const reports = yield call(ReportService.fetchReports, action.payload);
        yield put(fetchReportsSuccess(reports));
    } catch (error) {
        yield put(fetchReportsFailure(error));
    }
}

export function* reportsSaga() {
    yield takeLatest(FETCH_REPORTS_REQUEST, fetchReports);
}

export function* createReport(action) {
    try {
        const newReport = yield call(ReportService.addReport, action.payload);
        yield put(createReportSuccess(newReport));
    } catch (error) {
        yield put(createReportFailure(error));
    }
}

export function* createReportSaga() {
    yield takeLatest(CREATE_REPORT_REQUEST, createReport);
}

export function* deleteReport(action) {
    try {
        const response = yield call(ReportService.deleteReport, action.payload);
        yield put(deleteReportSuccess(response));
    } catch (error) {
        yield put(deleteReportFailure(error));
    }
}

export function* deleteReportSaga() {
    yield takeLatest(DELETE_REPORT_REQUEST, deleteReport);
}


export function* updateReport(action) {
    try {
        const response = yield call(ReportService.updateReport, action.payload.id, action.payload);
        yield put(updateReportSuccess(response));
    } catch (error) {
        yield put(updateReportFailure(error));
    }
}

export function* updateReportSaga() {
    yield takeLatest(UPDATE_REPORT_REQUEST, updateReport);
}