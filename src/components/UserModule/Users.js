import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import { fetchUsersRequest } from '../../redux/actions/userActions';
import './Users.css';


function Users() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const usersLoaded = useSelector(state => state.usersReducer.usersLoaded);

  useEffect(() => {
    if (!usersLoaded) {
      dispatch(fetchUsersRequest());
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
