import React, { useState } from 'react';
import api from '../services/api';
import '../styles/form.css';

const RemoveBook = () => {
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/admin/remove-book/${isbn}`);
      setSuccess('Book removed successfully!');
      setError('');
      setIsbn('');
    } catch (err) {
      setError('Failed to remove book. Please check the ISBN.');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Remove Book</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Remove Book
        </button>
      </form>
    </div>
  );
};

export default RemoveBook;