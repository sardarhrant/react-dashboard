import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from './reducers/sagas/index.saga';

describe('store configuration', () => {
    let store;

    beforeAll(() => {
        const sagaMiddleware = createSagaMiddleware();

        store = configureStore({
            reducer: rootReducer,
            middleware: [sagaMiddleware]
        });

        sagaMiddleware.run(rootSaga);
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
            // Add more reducers if applicable
        };

        expect(store.getState()).toEqual(expectedState);
    });

    // Add more test cases as needed...
});
