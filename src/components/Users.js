import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';
import UserService from '../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions/userAction';


function Users() {
  console.log('UserJs Iinit');

  const content = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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
        {users?.map(user => (
          <li key={user.id}>
            <Link to={{ pathname: `/users/${user.id}` }}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
