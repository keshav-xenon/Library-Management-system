import React, { useState } from "react";
import { removeBook } from "../services/api"; // Import the removeBook function
import "../styles/form.css";

function RemoveBook() {
  const [isbn, setIsbn] = useState("");
  const [message, setMessage] = useState("");

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const response = await removeBook(isbn); // Use the removeBook function
      setMessage(response.message);
    } catch (err) {
      setMessage(err.error || "Failed to remove book");
    }
  };

  return (
    <div className="form-container">
      <h2>Remove Book</h2>
      <form onSubmit={handleRemove}>
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <button type="submit">Remove Book</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default RemoveBook;