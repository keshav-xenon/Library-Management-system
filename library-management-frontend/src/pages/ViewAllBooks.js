import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/books.css';

const ViewAllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/reader/all-books');
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleIssueRequest = async (isbn) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setError('Please login to raise an issue request');
        return;
      }

      await api.post('/reader/raise-issue-request', {
        bookID: isbn,
        readerID: user.email
      });

      setSuccess('Issue request raised successfully!');
      setError('');
    } catch (err) {
      setError('Failed to raise issue request');
      setSuccess('');
    }
  };

  if (loading) return <div className="loading">Loading books...</div>;

  return (
    <div className="books-container">
      <h2>Available Books</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.ISBN} className="book-card">
            <div className="book-info">
              <h3>{book.Title}</h3>
              <p><strong>Authors:</strong> {book.Authors}</p>
              <p><strong>Publisher:</strong> {book.Publisher}</p>
              <p><strong>Version:</strong> {book.Version}</p>
              <p><strong>Available Copies:</strong> {book.AvailableCopies}</p>
            </div>
            <div className="book-actions">
              <button
                onClick={() => handleIssueRequest(book.ISBN)}
                disabled={book.AvailableCopies === 0}
                className="issue-button"
              >
                {book.AvailableCopies === 0 ? 'Not Available' : 'Request Issue'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllBooks;