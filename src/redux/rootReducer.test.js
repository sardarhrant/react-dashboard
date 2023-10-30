import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: rootReducer,
        });
    });

    it('should initialize with the correct state shape', () => {
        const expectedState = {
            usersReducer: {
                users: [],
                fetching: false,
                error: null,
                usersLoaded: false,
            },
            reportsReducer: {
                reports: [],
                fetching: false,
                error: null,
                reportsLoaded: false,
            },
        };

        expect(store.getState()).toEqual(expectedState);
    });

    // Add more test cases as needed...
});
