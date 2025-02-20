import React, { useState } from 'react';
import api from '../services/api';
import '../styles/form.css';

const SearchBook = () => {
  const [query, setQuery] = useState({
    title: '',
    author: '',
    publisher: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/reader/search-book', {
        params: query,
      });
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Failed to search for books. Please try again.');
      setResults([]);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Search for a Book</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={query.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={query.author}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={query.publisher}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Search
        </button>
      </form>
      {results.length > 0 && (
        <div className="results-container">
          <h3>Search Results:</h3>
          <ul>
            {results.map((book) => (
              <li key={book.ISBN}>
                <strong>{book.Title}</strong> by {book.Authors} - {book.Publisher} (Available Copies: {book.AvailableCopies})
                <button onClick={() => handleRaiseRequest(book.ISBN)}>Raise Issue Request</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};




export default SearchBook;