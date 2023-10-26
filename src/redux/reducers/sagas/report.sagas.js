import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchReportsFailure, fetchReportsSuccess } from '../../actions/reportActions';
import { FETCH_REPORTS_REQUEST } from '../../constant';
import ReportService from '../../../services/ReportService';

function* fetchReports(action) {
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