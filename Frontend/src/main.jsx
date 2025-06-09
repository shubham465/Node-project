import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './Login.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './Todo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/dashboard/todo" element={<Todo />} />
        <Route path="/dashboard/todo/*" element={<Todo />} />
      </Routes>
    </Router>
  </StrictMode>
);
