import { FETCH_USERS } from "../constant";

const initialState = {
    reports: [],
    users: [],
    error: null
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, fetching: false, users: action.users };
        // case FETCH_USERS_SUCCESS:
        //     return { ...state, fetching: false, users: action.users };
        // case FETCH_USERS_FAILURE:
        //     return { ...state, fetching: false, users: [], error: action.error };
        default:
            return state;
    }
}