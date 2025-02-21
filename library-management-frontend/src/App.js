import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import ReaderProfile from "./pages/ReaderProfile";
import ListIssueRequests from "./pages/ListIssueRequests";
import SearchBook from "./pages/SearchBook";
import RaiseIssueRequest from "./pages/RaiseIssueRequest";
import ViewAllBooks from "./pages/ViewAllBooks";
import ReturnBook from "./pages/ReturnBook";
import ApproveRejectRequests from "./pages/ApproveRejectRequests";
import ReaderIssueInfo from "./pages/ReaderIssueInfo";
import AdminNavbar from "/home/xs516-kesjha/Desktop/library-management/library-management-frontend/src/pages/AdminDashboard.js";
import ReaderNavbar from "/home/xs516-kesjha/Desktop/library-management/library-management-frontend/src/pages/ReaderNavbar.js";
import Register from "./pages/Register";
import Header from "./pages/Header";
import RemoveBook from "./pages/RemoveBook";
import UpdateBook from "./pages/UpdateBook";
const App = () => {
  return (
    <Router>
      
      <Routes>
     
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavbar />
              <Routes>
                <Route path="add-book" element={<AddBook />} />
                <Route path="remove-book" element={<RemoveBook />} />
                <Route path="update-book" element={<UpdateBook />} />
                <Route path="list-issue-requests" element={<ListIssueRequests />} />
              </Routes>
            </>
          }
        />

        {/* Reader Routes */}
        <Route
          path="/reader/*"
          element={
            <>
              <ReaderNavbar />
              <Routes>
                <Route path="search-book" element={<SearchBook />} />
                <Route path="raise-issue-request" element={<RaiseIssueRequest />} />
                <Route path="profile" element={<ReaderProfile />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;