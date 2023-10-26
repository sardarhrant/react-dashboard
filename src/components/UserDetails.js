import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import UserService from '../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { useErrorBoundary } from "react-error-boundary";
import { fetchUsersSuccess } from '../redux/actions/userActions';
import { fetchReportsSuccess } from '../redux/actions/reportActions';

function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const usersLoaded = useSelector(state => state.usersReducer.usersLoaded);
    const reportsLoaded = useSelector(state => state.reportsReducer.reportsLoaded);
    let users = useSelector(state => state.usersReducer.users);
    const reports = useSelector(state => state.reportsReducer.reports);
    const { showBoundary } = useErrorBoundary();
    const dispatch = useDispatch();

    const user = users?.find(user => user.id === +id);
    const userReports = reports.filter(report => report.userId === +id);

    useEffect(() => {
        if (!usersLoaded) {
            UserService.fetchUsers()
                .then(users => {
                    dispatch(fetchUsersSuccess(users));
                })
                .catch(error => {
                    showBoundary(error)
                });
        }

        if (!reportsLoaded) {
            UserService.fetchReports().then(reports => {
                dispatch(fetchReportsSuccess(reports));
            }).catch(error => {
                showBoundary(error)
            });
        }
    }, [id, usersLoaded]);

    return (
        <div>
            <b onClick={() => navigate(-1)}> Back</b>
            <h2>{user?.name}</h2>
            <hr />
            <div><b>Email:</b> {user?.email}</div>
            <div><b>Date:</b> {user?.dateJoined}</div>
            <h3>Reports</h3>
            <hr />
            <ul>
                {userReports?.map(report => (
                    <li key={report.id}>
                        <h4>{report?.title}</h4>
                        <p>{report?.content}</p>
                        <span>{report.dateCreated}</span>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}

export default UserDetails