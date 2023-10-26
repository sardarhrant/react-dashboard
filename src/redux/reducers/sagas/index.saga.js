import { all } from 'redux-saga/effects';
import { reportsSaga } from './report.sagas';
import { usersSaga } from './user.sagas';

export default function* rootSaga() {
  yield all([
    usersSaga(),
    reportsSaga()
  ]);
}