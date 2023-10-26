import { all, fork } from 'redux-saga/effects';
import { createReportSaga, deleteReportSaga, reportsSaga, updateReportSaga } from './report.sagas';
import { usersSaga } from './user.sagas';

export default function* rootSaga() {
  yield all([
    fork(reportsSaga),
    fork(usersSaga),
    fork(createReportSaga),
    fork(deleteReportSaga),
    fork(updateReportSaga)
  ]);
}