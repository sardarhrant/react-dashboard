
import { usersReducer } from './userReducer';
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from '../constant';

describe('usersReducer', () => {
    it('should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual({
            users: [],
            fetching: false,
            error: null,
            usersLoaded: false,
        });
    });

    it('should handle FETCH_USERS_REQUEST', () => {
        const action = {
            type: FETCH_USERS_REQUEST,
        };
        expect(usersReducer(undefined, action)).toEqual({
            users: [],
            fetching: true,
            error: null,
            usersLoaded: false,
        });
    });

    it('should handle FETCH_USERS_SUCCESS', () => {
        const action = {
            type: FETCH_USERS_SUCCESS,
            payload: [{ id: 1, name: 'John Doe' }],
        };
        expect(usersReducer(undefined, action)).toEqual({
            users: [{ id: 1, name: 'John Doe' }],
            fetching: false,
            error: null,
            usersLoaded: true,
        });
    });

    it('should handle FETCH_USERS_FAILURE', () => {
        const action = {
            type: FETCH_USERS_FAILURE,
            payload: 'Error message',
        };
        expect(usersReducer(undefined, action)).toEqual({
            users: [],
            fetching: false,
            error: 'Error message',
            usersLoaded: false,
        });
    });
});
