import React, { useState } from 'react';
import api from '../services/api';
import '../styles/form.css';

const AddBook = () => {
  const [formData, setFormData] = useState({
    isbn: '',
    title: '',
    authors: '',
    publisher: '',
    version: '',
    totalCopies: '',
    libId: '' // Assuming you have a way to get the library ID
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/add-book', formData);
      setSuccess('Book added successfully!');
      setError('');
      setFormData({
        isbn: '',
        title: '',
        authors: '',
        publisher: '',
        version: '',
        totalCopies: '',
        libId: ''
      });
    } catch (err) {
      setError('Failed to add book. Please check your input.');
      setSuccess('');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add New Book</h2>
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
            required
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
            required
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
            required
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
            required
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="libId">Library ID:</label>
          <input
            type="text"
            id="libId"
            name="libId"
            value={formData.libId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;