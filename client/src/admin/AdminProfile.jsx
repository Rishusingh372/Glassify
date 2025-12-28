import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/admin/adminProfile.css';

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const api = `${import.meta.env.VITE_BACKEND_URL}/admin/profile`;
            const response = await axios.get(api);
            setAdmin(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching admin data:", error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Clear any admin data from localStorage if exists
        localStorage.removeItem('admin');
        localStorage.removeItem('adminemail');
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Loading admin profile...</div>;
    }

    return (
        <div className="admin-profile-container">
            <div className="admin-profile-card">
                <div className="admin-header">
                    <h2>Admin Profile</h2>
                    <span className="admin-badge">Administrator</span>
                </div>
                
                {admin ? (
                    <div className="profile-info">
                        <div className="info-item">
                            <label>Name:</label>
                            <span>{admin.name}</span>
                        </div>
                        <div className="info-item">
                            <label>Admin ID:</label>
                            <span>{admin._id}</span>
                        </div>
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{admin.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Role:</label>
                            <span className="role-badge">System Administrator</span>
                        </div>
                    </div>
                ) : (
                    <div className="error">Admin data not found</div>
                )}

                <div className="admin-stats">
                    <h3>Quick Stats</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">∞</span>
                            <span className="stat-label">Total Access</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">Full</span>
                            <span className="stat-label">Permissions</span>
                        </div>
                    </div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminProfile;