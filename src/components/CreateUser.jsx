import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const CreateUser = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: '',
  });

  const { users, addUser } = useContext(UserContext); // Access users and addUser from context
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get the highest ID from the current users and increment it by 1
    const newId = users.length > 0 ? Math.max(...users.map((u) => parseInt(u.id, 10))) + 1 : 1;
    console.log(newId);
    // Combine firstname and lastname into a single name property
    const newUser = {
      id: newId, // Incremented ID
      name: `${user.firstname} ${user.lastname}`, // Combine firstname and lastname
      email: user.email,
      department: user.department || 'General', // Default to 'General' if department is empty
      avatarId: Math.floor(Math.random() * 70) + 1, // Generate random avatar ID
    };

    await addUser(newUser); // Add the new user
    navigate('/users'); // Redirect to users list page
  };

  return (
    <div className="create-user-container">
      <h1 className="title">Create User</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
            className="input-field"
            required
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
            className="input-field"
            required
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
            className="input-field email"
            required
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
            className="input-field"
          />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
