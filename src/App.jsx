import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import axios from 'axios';

// Create a context for users
export const UserContext = createContext();

const App = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // Add state for handling errors

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const usersWithDepartment = response.data.map((user) => ({
        ...user,
        department: user.department || 'General',
      }));
      setUsers(usersWithDepartment);
      setError(null); // Clear previous errors if the fetch is successful
    } catch (error) {
      setError('Error fetching users, please try again later.');
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to add a new user
  const addUser = async (user) => {
    try {
      const newUser = {
        ...user,
        // id: Date.now(),
        department: user.department || 'General', // Default 'department' to 'General'
      };
      setUsers([...users, newUser]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Function to edit an existing user
  const editUser = async (updatedUser) => {
    try {
      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id // Ensure `id` matches exactly
          ? { ...updatedUser, department: updatedUser.department || 'General' }
          : u
      );
      console.log('Updated Users:', updatedUsers);
      setUsers(updatedUsers); // This updates the state in context
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      // Simulate a successful delete
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      // Remove the user from the state
      const updatedUsers = users.filter((u) => u.id !== id);
      setUsers(updatedUsers); 
    } catch (error) {
      console.error('Error deleting user:', error); 
    }
  };

  return (
    
    <UserContext.Provider value={{ users, error, addUser, editUser, deleteUser }}>
      <Router>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/edit/:id" element={<UpdateUser />} />
        </Routes>
      </Router>
      </UserContext.Provider>
   
  );
};

export default App;