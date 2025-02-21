import React, { useState } from "react";
import api from "../services/api";
import "../styles/form.css";

function AddBook() {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    authors: "",
    publisher: "",
    totalCopies: 0,
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/add-book", book);
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Failed to add book");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            value={book.isbn}
            onChange={(e) => setBook({ ...book, isbn: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={book.title}
            onChange={(e) => setBook({ ...book, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Authors</label>
          <input
            type="text"
            value={book.authors}
            onChange={(e) => setBook({ ...book, authors: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Publisher</label>
          <input
            type="text"
            value={book.publisher}
            onChange={(e) => setBook({ ...book, publisher: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Total Copies</label>
          <input
            type="number"
            value={book.totalCopies}
            onChange={(e) =>
              setBook({ ...book, totalCopies: parseInt(e.target.value) })
            }
            required
          />
        </div>
        <button type="submit">Add Book</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default AddBook;