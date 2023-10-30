import {
    createReportRequest,
    createReportSuccess,
    createReportFailure,
    fetchReportsRequest,
    fetchReportsSuccess,
    fetchReportsFailure,
    deleteReportRequest,
    deleteReportSuccess,
    deleteReportFailure,
    updateReportRequest,
    updateReportSuccess,
    updateReportFailure,
    filterReportsByUser
} from './reportActions';

describe('Redux Action Creators', () => {
    it('should create an action to request creating a report', () => {
        const newReport = {
            "id": 1698386379554,
            "userId": 1,
            "title": "Report 22 From John Doe ",
            "content": "Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe ",
            "dateCreated": 1698386379554
        };
        const expectedAction = {
            type: 'CREATE_REPORT_REQUEST',
            payload: newReport
        };
        expect(createReportRequest(newReport)).toEqual(expectedAction);
    });

    it('should create an action for successful creation of a report', () => {
        const newReport = {
            "id": 1698386379554,
            "userId": 1,
            "title": "Report 22 From John Doe ",
            "content": "Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe ",
            "dateCreated": 1698386379554
        };
        const expectedAction = {
            type: 'CREATE_REPORT_SUCCESS',
            payload: newReport
        };
        expect(createReportSuccess(newReport)).toEqual(expectedAction);
    });

    it('should create an action for failure to create a report', () => {
        const error = 'Error message';
        const expectedAction = {
            type: 'CREATE_REPORT_FAILURE',
            payload: error
        };
        expect(createReportFailure(error)).toEqual(expectedAction);
    });

    it('should create an action to request fetching reports', () => {
        const expectedAction = {
            type: 'FETCH_REPORTS_REQUEST'
        };
        expect(fetchReportsRequest()).toEqual(expectedAction);
    });

    it('should create an action for successful fetching of reports', () => {
        const reports = [{
            "id": 1698320596081,
            "userId": 3,
            "title": "Report Title 3:44 ",
            "content": "Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 Report Title 3:44 ",
            "dateCreated": 1698320615671
        },
        {
            "id": 1698386344049,
            "userId": 1,
            "title": "Report 21 From John Doe",
            "content": "Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe Report 21 From John Doe ",
            "dateCreated": 1698386344049
        }];
        const expectedAction = {
            type: 'FETCH_REPORTS_SUCCESS',
            payload: reports
        };
        expect(fetchReportsSuccess(reports)).toEqual(expectedAction);
    });

    it('should create an action for failure to fetch reports', () => {
        const error = 'Error message';
        const expectedAction = {
            type: 'FETCH_REPORTS_FAILURE',
            payload: error
        };
        expect(fetchReportsFailure(error)).toEqual(expectedAction);
    });

    it('should create an action to request deleting a report', () => {
        const reportId = '123';
        const expectedAction = {
            type: 'DELETE_REPORT_REQUEST',
            payload: reportId
        };
        expect(deleteReportRequest(reportId)).toEqual(expectedAction);
    });

    it('should create an action for successful deletion of a report', () => {
        const reportId = '123';
        const expectedAction = {
            type: 'DELETE_REPORT_SUCCESS',
            payload: reportId
        };
        expect(deleteReportSuccess(reportId)).toEqual(expectedAction);
    });

    it('should create an action for failure to delete a report', () => {
        const error = 'Error message';
        const expectedAction = {
            type: 'DELETE_REPORT_FAILURE',
            payload: error
        };
        expect(deleteReportFailure(error)).toEqual(expectedAction);
    });

    it('should create an action to request updating a report', () => {
        const updatedReport = {
            "id": 1698320532671,
            "userId": 10,
            "title": "Report Title 3:42 ",
            "content": "Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 ",
            "dateCreated": 1698320532671
        };
        const expectedAction = {
            type: 'UPDATE_REPORT_REQUEST',
            payload: updatedReport
        };
        expect(updateReportRequest(updatedReport)).toEqual(expectedAction);
    });

    it('should create an action for successful update of a report', () => {
        const updatedReport = {
            "id": 1698320532671,
            "userId": 10,
            "title": "Report Title 3:42 ",
            "content": "Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 Report Title 3:42 ",
            "dateCreated": 1698320532671
        };
        const expectedAction = {
            type: 'UPDATE_REPORT_SUCCESS',
            payload: updatedReport
        };
        expect(updateReportSuccess(updatedReport)).toEqual(expectedAction);
    });

    it('should create an action for failure to update a report', () => {
        const error = 'Error message';
        const expectedAction = {
            type: 'UPDATE_REPORT_FAILURE',
            payload: error
        };
        expect(updateReportFailure(error)).toEqual(expectedAction);
    });

    it('should create an action to filter reports by user', () => {
        const userId = 3;
        const expectedAction = {
            type: 'FILTER_REPORTS_BY_USER',
            payload: userId
        };
        expect(filterReportsByUser(userId)).toEqual(expectedAction);
    });
});
