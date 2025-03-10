import React, { useState } from "react";
import axios from "axios";
import "../styles/form.css"; // Reuse the form styles

const RaiseIssueRequest = () => {
  const [bookID, setBookID] = useState("");
  const [message, setMessage] = useState("");

  const handleRaiseRequest = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email"); // Reader email from local storage
    const requestData = {
      BookID: bookID,
      ReaderID: email, // Assuming email is used as ReaderID
      RequestDate: new Date().toISOString().split("T")[0], // Current date
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/reader/raise-issue-request",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${email}`, // Pass email as Bearer token
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to raise issue request. Try again."
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Raise an Issue Request</h1>
      <form onSubmit={handleRaiseRequest}>
        <div className="form-group">
          <label>Book ID (ISBN):</label>
          <input
            type="text"
            value={bookID}
            onChange={(e) => setBookID(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Raise Request
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RaiseIssueRequest;