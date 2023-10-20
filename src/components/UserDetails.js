import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function UserDetails() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [userReports, setUserReports] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));

        fetch(`http://localhost:8080/reports?userId=${id}`)
            .then(response => response.json())
            .then(data => setUserReports(data));
    }, []);

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