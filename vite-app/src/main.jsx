import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Register from './Register.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contacts from './Contacts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/api/contacts" element={<Contacts />} />
        <Route path="/api/contacts/*" element={<Contacts />} />
      </Routes>
    </Router>
  </StrictMode>
);
