import { FETCH_USERS } from "../constant";

export const getUsers = () => {
    console.log("Fetching Users");
    return {
        type: FETCH_USERS
    };
};