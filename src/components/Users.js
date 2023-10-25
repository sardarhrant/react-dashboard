import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';
import UserService from '../services/UserService';
import { useDispatch, useSelector, connect } from 'react-redux';
import { fetchUsersSuccess } from '../redux/actions/userActions';


function Users() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const usersLoaded = useSelector(state => state.usersReducer.usersLoaded);

  useEffect(() => {
    if (!usersLoaded) {
      UserService.fetchUsers().then(users => {
        dispatch(fetchUsersSuccess(users))
      });
    }
  }, [dispatch, usersLoaded]);

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

const mapStateToProps = state => {
  return {
    users: state.userReducer,
  };
};

export default connect(mapStateToProps)(Users);
