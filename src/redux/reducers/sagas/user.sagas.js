import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchUsersFailure, fetchUsersSuccess } from '../../actions/userActions';
import UserService from '../../../services/UserService';
import { FETCH_USERS_REQUEST } from '../../constant';

function* fetchUser(action) {
    try {
        const users = yield call(UserService.fetchUsers, action.payload);
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        yield put(fetchUsersFailure(error));
    }
}

export function* usersSaga() {
    yield takeLatest(FETCH_USERS_REQUEST, fetchUser);
}