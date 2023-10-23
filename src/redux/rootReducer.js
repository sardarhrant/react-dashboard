import { combineReducers } from "redux";
import { userReducer } from "./reducers/userReducer";
import { fetchReports } from "./reducers/reportReducer";

export default combineReducers({
    userReducer,
    fetchReports
});