import React, { useState } from 'react';
import api from '../services/api';
import '../styles/return.css';

const ReturnBook = () => {
  const [issueId, setIssueId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post(`/admin/return-book/${issueId}`);
      setSuccess('Book return processed successfully!');
      setIssueId('');
    } catch (err) {
      setError('Failed to process book return. Please check the Issue ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="return-container">
      <h2>Process Book Return</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="return-form">
        <div className="form-group">
          <label htmlFor="issueId">Issue ID:</label>
          <input
            type="text"
            id="issueId"
            value={issueId}
            onChange={(e) => setIssueId(e.target.value)}
            required
            placeholder="Enter Issue ID"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !issueId}
        >
          {loading ? 'Processing...' : 'Process Return'}
        </button>
      </form>
    </div>
  );
};

export default ReturnBook;