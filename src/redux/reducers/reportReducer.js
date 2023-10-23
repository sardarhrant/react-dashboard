import { FETCH_REPORTS } from "../constant";

export const fetchReports = (data = [], action) => {
    switch (action.type) {
        case FETCH_REPORTS:
            console.warn("FETCH REPORTS", action);
            return [...data, action.data];

        default:
            return data;
    }
}