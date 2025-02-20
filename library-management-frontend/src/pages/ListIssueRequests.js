import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/list.css';

const ListIssueRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get('/admin/list-issue-requests');
      setRequests(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch issue requests.');
    }
  };

  const handleApprove = async (reqID) => {
    try {
      await api.post(`/admin/approve-request/${reqID}`);
      setSuccess(`Request ${reqID} approved successfully!`);
      setError('');
      // Refresh the list after approval
      fetchRequests();
    } catch (err) {
      setError('Failed to approve request. Please try again.');
      setSuccess('');
    }
  };

  const handleReject = async (reqID) => {
    try {
      await api.post(`/admin/reject-request/${reqID}`);
      setSuccess(`Request ${reqID} rejected successfully!`);
      setError('');
      // Refresh the list after rejection
      fetchRequests();
    } catch (err) {
      setError('Failed to reject request. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="list-container">
      <h2>Issue Requests</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <table className="request-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Book ID</th>
            <th>Reader ID</th>
            <th>Request Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No issue requests found
              </td>
            </tr>
          ) : (
            requests.map((request) => (
              <tr key={request.ReqID}>
                <td>{request.ReqID}</td>
                <td>{request.BookID}</td>
                <td>{request.ReaderID}</td>
                <td>{new Date(request.RequestDate).toLocaleString()}</td>
                <td>
                  <button 
                    onClick={() => handleApprove(request.ReqID)}
                    disabled={request.ApprovalDate}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(request.ReqID)}
                    disabled={request.ApprovalDate}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListIssueRequests;