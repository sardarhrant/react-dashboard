// import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import UserService from "../../../services/UserService";
import { FETCH_USERS } from "../../constant";

// function* getUsers() {
//     const data = yield 'aaaaa';// UserService.fetchUsers();
//     yield put({
//         type: FETCH_USERS,
//         data,
//     });
// }

// function* userSaga() {
//     yield takeEvery(FETCH_USERS, getUsers)
// }

// export default userSaga;

import { takeLatest, call, put } from "redux-saga/effects";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* usersSaga() {
    yield takeLatest(FETCH_USERS, workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        const users = yield call(fetchUsers);

        console.log(users);
        // dispatch a success action to the store with the new users
        yield put({ type: FETCH_USERS, users: users });

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "FETCH_USERS_FAILURE", error: error });
    }
}

function fetchUsers() {
    return axios({
        method: "get",
        url: "http://localhost:8080/users"
    });
}