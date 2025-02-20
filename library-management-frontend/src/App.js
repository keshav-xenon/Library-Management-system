import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './pages/Login';
import '/home/xs516-kesjha/Desktop/library-management/library-management-frontend/src/styles/App.css';
import ReturnBook from './pages/ReturnBook';
import ViewAllBooks from './pages/ViewAllBooks';

// import AddBook from './pages/AddBook';

import AddBook from './pages/AddBook';
import RemoveBook from './pages/RemoveBook';
import UpdateBook from './pages/UpdateBook';
import ListIssueRequests from './pages/ListIssueRequests';
import ReaderProfile from './pages/ReaderProfile';
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/add-book" element={<AddBook />} />
            <Route path="/admin/remove-book" element={<RemoveBook />} />
            <Route path="/admin/update-book" element={<UpdateBook />} />
            <Route path="/reader/profile" element={<ReaderProfile />} />
            <Route path="/admin/return-book" element={<ReturnBook />} />
            <Route path="/admin/list-issue-requests" element={<ListIssueRequests />} />
            <Route path="/reader/books" element={<ViewAllBooks />} />
            <Route path="/admin/add-book" element={<AddBook />} />
            {/* More routes will be added later */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;







// Inside your Routes component

// Inside your Routes component


// Inside the <Routes> component

// Inside the <Routes> component
