import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "../constant";

const initialState = {
    users: [],
    fetching: false,
    error: null,
    usersLoaded: false,
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                users: action.payload,
                error: null,
                usersLoaded: true,
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            };
        default:
            return state;
    }
}