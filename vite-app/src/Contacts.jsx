import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5001/api/contacts';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [editId, setEditId] = useState(null);
    const token = JSON.parse(localStorage.getItem("token"))
    const header = {
       headers: {
        Authorization: `Bearer ${token}`,
       }
    }
  // Fetch contacts
  const fetchContacts = async () => {
    const res = await axios.get(API, header);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.name || !form.email || !form.phone){
      alert("All details are mandatory")
      return
    }
    if (editId) {
      await axios.put(`${API}/${editId}`, form, header);
    } else {
      await axios.post(API, form, header);
    }
    setForm({ name: '', email: '', phone: '' });
    setEditId(null);
    fetchContacts();
  };

  // Edit contact
  const handleEdit = (contact) => {
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setEditId(contact._id);
  };

  // Delete contact
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`, header);
    fetchContacts();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Contact Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br/>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br/>
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        /><br/><br/>
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.name} | {c.email} | {c.phone}
            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
