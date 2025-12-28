import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Phone, User, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import '../css/admin/contacts.css';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const api = `${import.meta.env.VITE_BACKEND_URL}/api/contacts`;
            const response = await axios.get(api);
            setContacts(response.data.data || response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error('Failed to load contacts');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    if (loading) {
        return (
            <div className="contacts-loading">
                <div className="loading-spinner"></div>
                <p>Loading contacts...</p>
            </div>
        );
    }

    return (
        <div className="contacts-container">
            <div className="contacts-header">
                <h2>Contact Leads</h2>
                <p>Manage all incoming contact form submissions</p>
            </div>

            {contacts.length === 0 ? (
                <div className="no-contacts">
                    <Mail size={48} />
                    <h3>No Contact Leads</h3>
                    <p>No contact form submissions yet.</p>
                </div>
            ) : (
                <div className="contacts-grid">
                    {contacts.map((contact) => (
                        <div key={contact._id} className="contact-card">
                            <div className="contact-header">
                                <div className="contact-avatar">
                                    <User size={20} />
                                </div>
                                <div className="contact-info">
                                    <h4>{contact.name}</h4>
                                    <span className="contact-service">{contact.service}</span>
                                </div>
                            </div>
                            <div className="contact-details">
                                <div className="contact-detail">
                                    <Mail size={16} />
                                    <span>{contact.email}</span>
                                </div>
                                <div className="contact-detail">
                                    <Phone size={16} />
                                    <span>{contact.number}</span>
                                </div>
                                <div className="contact-detail">
                                    <Calendar size={16} />
                                    <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contacts;