import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';
import UserService from '../services/UserService';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await UserService.fetchUsers();
      setUsers(users)
    }

    fetchUsers();
  }, []);

  return (
    <div className="users">
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={{ pathname: `/users/${user.id}` }}>
              {user.name}
            </Link>
          </li>

          // <Link  to={{pathname: `/view-contact-details/${user.id}`, state: { users: user } }}></Link>


        ))}
      </ul>
    </div>
  );
}

export default Users;
