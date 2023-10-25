import { combineReducers } from "redux";
import { usersReducer } from "./reducers/userReducer";
import { reportsReducer } from "./reducers/reportsReducer";

export default combineReducers({
    usersReducer,
    reportsReducer
});