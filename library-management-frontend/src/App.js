import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import RemoveBook from "./pages/RemoveBook";
import UpdateBook from "./pages/UpdateBook";
import SearchBook from "./pages/SearchBook";
import ListIssueRequests from "./pages/ListIssueRequests";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/remove-book" element={<RemoveBook />} />
          <Route path="/update-book" element={<UpdateBook />} />
          <Route path="/search-book" element={<SearchBook />} />
          <Route path="/list-issue-requests" element={<ListIssueRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;