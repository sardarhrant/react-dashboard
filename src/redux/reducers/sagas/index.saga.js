import { all, fork } from 'redux-saga/effects';
import { usersSaga } from './user.sagas';

export default function* rootSaga() {
  yield all([
    usersSaga()
  ])
}