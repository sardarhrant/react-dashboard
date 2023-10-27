import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../../redux/actions/userActions';
import { fetchReportsRequest } from '../../redux/actions/reportActions';
import { FixedSizeList as List } from 'react-window';
import ReportRow from '../ReportModule/ReportRow';

function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const usersLoaded = useSelector(state => state.usersReducer.usersLoaded);
    const reportsLoaded = useSelector(state => state.reportsReducer.reportsLoaded);
    let users = useSelector(state => state.usersReducer.users);
    const reports = useSelector(state => state.reportsReducer.reports);
    const dispatch = useDispatch();

    const user = users?.find(user => user.id === +id);
    const userReports = reports.filter(report => report.userId === +id);

    useEffect(() => {
        if (!reportsLoaded) {
            dispatch(fetchReportsRequest());
        }

        if (!usersLoaded) {
            dispatch(fetchUsersRequest());
        }
    }, [dispatch, usersLoaded, reportsLoaded]);

    return (
        <div>
            <b onClick={() => navigate(-1)}> Back</b>
            <h2>{user?.name}</h2>
            <hr />
            <div><b>Email:</b> {user?.email}</div>
            <div><b>Date:</b> {user?.dateJoined}</div>
            <h3>Reports (Infinite scrolling)</h3>
            <List
                useIsScrolling
                height={390}
                itemCount={userReports.length}
                itemSize={170}
                itemData={userReports?.map(report => ({ ...report, isEditable: false }))}
                className="report-wrapper"
            >
                {({ index, isScrolling, style, data }) => (
                    <ReportRow
                        isScrolling={isScrolling}
                        index={index}
                        style={style}
                        data={data}
                        isEditable={data[index].isEditable}
                    />
                )}
            </List>
        </div>
    )
}

export default UserDetails