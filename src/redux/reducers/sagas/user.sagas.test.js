import { call } from 'redux-saga/effects';
import { FETCH_USERS_REQUEST } from '../../constant';
import { usersSaga } from './user.sagas';
import UserService from '../../../services/UserService';
import { fetchUsersSuccess } from '../../actions/userActions';

import { expectSaga } from 'redux-saga-test-plan';

describe('User Saga', () => {
    it('should handle fetching users', () => {
        const action = {
            type: FETCH_USERS_REQUEST, payload: {
                "id": 7,
                "name": "Olivia Davis",
                "email": "olivia@example.com",
                "dateJoined": "2023-10-26"
            }
        };
        const users = [ /* array of users */];

        return expectSaga(usersSaga)
            .provide([
                [call(UserService.fetchUsers, {
                    "id": 7,
                    "name": "Olivia Davis",
                    "email": "olivia@example.com",
                    "dateJoined": "2023-10-26"
                }), users],
            ])
            .put(fetchUsersSuccess(users))
            .dispatch(action)
            .silentRun();
    });
});

