import React, { useState } from 'react';
import api from '../services/api';
import '../styles/form.css';

const UpdateBook = () => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    authors: '',
    publisher: '',
    version: '',
    totalCopies: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/update-book/${formData.isbn}`, formData);
      setSuccess('Book updated successfully!');
      setError('');
      setFormData({
        isbn: '',
        title: '',
        authors: '',
        publisher: '',
        version: '',
        totalCopies: '',
      });
    } catch (err) {
      setError('Failed to update book. Please check your input.');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Update Book</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="form-group">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="authors">Authors:</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="version">Version:</label>
          <input
            type="text"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalCopies">Total Copies:</label>
          <input
            type="number"
            id="totalCopies"
            name="totalCopies"
            value={formData.totalCopies}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;