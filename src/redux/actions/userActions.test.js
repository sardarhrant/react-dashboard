import {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure
} from './userActions';

describe('Redux User Action Creators', () => {
    it('should create an action to request fetching users', () => {
        const expectedAction = {
            type: 'FETCH_USERS_REQUEST'
        };
        expect(fetchUsersRequest()).toEqual(expectedAction);
    });

    it('should create an action for successful fetching of users', () => {
        const users = [{
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "dateJoined": "2023-10-20"
        },
        {
            "id": 2,
            "name": "Jane Doe",
            "email": "jane@example.com",
            "dateJoined": "2023-10-21"
        },
        {
            "id": 3,
            "name": "Bob Smith",
            "email": "bob@example.com",
            "dateJoined": "2023-10-22"
        },
        {
            "id": 7,
            "name": "Olivia Davis",
            "email": "olivia@example.com",
            "dateJoined": "2023-10-26"
        }];
        const expectedAction = {
            type: 'FETCH_USERS_SUCCESS',
            payload: users
        };
        expect(fetchUsersSuccess(users)).toEqual(expectedAction);
    });

    it('should create an action for failure to fetch users', () => {
        const error = 'Error message';
        const expectedAction = {
            type: 'FETCH_USERS_FAILURE',
            payload: error
        };
        expect(fetchUsersFailure(error)).toEqual(expectedAction);
    });
});
