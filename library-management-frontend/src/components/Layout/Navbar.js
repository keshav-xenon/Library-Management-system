import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '/home/xs516-kesjha/Desktop/library-management/library-management-frontend/src/styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Library Management System</Link>
      </div>

      <div className="nav-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && user.role === 'admin' && (
          <>
            <Link to="/admin/add-book">Add Book</Link>
            <Link to="/admin/remove-book">Remove Book</Link>
            <Link to="/admin/update-book">Update Book</Link>
            <Link to="/admin/issue-requests">Issue Requests</Link>
            <Link to="/admin/return-book">Return Book</Link>
          </>
        )}

        {user && user.role === 'reader' && (
          <>
            <Link to="/reader/books">View Books</Link>
            <Link to="/reader/search">Search Books</Link>
            <Link to="/reader/profile">My Profile</Link>
          </>
        )}

        {user && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;