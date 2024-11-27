import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

const UserList = () => {
  const { users, deleteUser, error } = useContext(UserContext);

  return (
    <div className="user-list-container">
      <h1 className='title'>Users List</h1>
        {/* Show error message if there's an error */}
        {error && <div className="error-message">{error}</div>}
      <div className="user-list">
        {users.map((user) => {
          // Split the name into first and last name
          const [firstname, ...lastnameParts] = user.name.split(' ');
          const lastname = lastnameParts.join(' ');

          return (
            <div key={user.id} className="user-card">
              {/* Avatar Image */}
              <img
                src={`https://i.pravatar.cc/150?img=${user.id <= 10 ? user.id : user.id % 10}`}
                alt={`${user.name}'s avatar`}
              />
              {/* User Information */}
              <div className="user-info">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>First Name:</strong> {firstname}</p>
                <p><strong>Last Name:</strong> {lastname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Department:</strong> {user.department || 'General'}</p> {/* Default to 'General' if not provided */}
                <div className="user-actions">
                  <Link to={`/edit/${user.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => deleteUser(user.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="create-button-container">
        <Link to="/create">
          <button className="create-button">Create User</button>
        </Link>
      </div>
    </div>
  );
};

export default UserList;
