import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import UserService from '../services/UserService';

function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [userReports, setUserReports] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await Promise.all([UserService.fetchUserById(id), UserService.fetchUserReportById(id)]);
            const [user, reports] = data;
            setUser(user)
            setUserReports(reports)
        }

        fetchData()
    }, [id]);

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