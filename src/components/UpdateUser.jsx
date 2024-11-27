import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';

const UpdateUser = () => {
  const { id } = useParams();
  const { users, editUser } = useContext(UserContext);
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userToEdit = users.find((u) => u.id === Number(id)); // Match id as a number
    if (userToEdit) {
      const [firstname, ...lastnameParts] = userToEdit.name.split(' ');
      const lastname = lastnameParts.join(' ');
      setUser({
        firstname,
        lastname,
        email: userToEdit.email,
        department: userToEdit.department || 'General',
      });
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: Number(id), // Add the id explicitly
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      department: user.department,
    };
    await editUser(updatedUser); // Call the editUser function
    navigate('/users');
  };

  return (
    <div className="edit-user-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit} className="edit-user-form">
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-input email"
          />
        </label>
        <br />
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={user.department}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <br />
        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
