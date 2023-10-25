import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { usersSaga } from './reducers/sagas/user.sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    // middleware: [sagaMiddleware]
});

// sagaMiddleware.run(usersSaga);

export default store;