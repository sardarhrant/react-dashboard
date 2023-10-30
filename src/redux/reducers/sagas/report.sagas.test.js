import { call, put } from 'redux-saga/effects';
import {
    fetchReports
} from './report.sagas'; // Replace with the actual path

import ReportService from '../../../services/ReportService';
import {
    fetchReportsFailure,
    fetchReportsSuccess,
} from '../../actions/reportActions';
import {
    FETCH_REPORTS_REQUEST
} from '../../constant';

describe('Report Sagas', () => {
    it('should handle fetching reports', () => {
        const action = {
            type: FETCH_REPORTS_REQUEST, payload: {
                "id": 1698311210840,
                "userId": "10",
                "title": "Report Title 1:06 ",
                "content": "Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 ",
                "dateCreated": 1698311210840
            }
        };
        const gen = fetchReports(action);

        expect(gen.next().value).toEqual(call(ReportService.fetchReports, {
            "id": 1698311210840,
            "userId": "10",
            "title": "Report Title 1:06 ",
            "content": "Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 ",
            "dateCreated": 1698311210840
        }));

        const reports = [{
            "id": 1698311210840,
            "userId": "10",
            "title": "Report Title 1:06 ",
            "content": "Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 Report Title 1:06 ",
            "dateCreated": 1698311210840
        }];
        expect(gen.next(reports).value).toEqual(put(fetchReportsSuccess(reports)));

        const error = new Error('Failed to fetch reports');
        expect(gen.throw(error).value).toEqual(put(fetchReportsFailure(error)));

        expect(gen.next()).toEqual({ done: true, value: undefined });
    });
});
