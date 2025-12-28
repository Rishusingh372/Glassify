import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/employee/profile.css';

const Profile = () => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeeData();
    }, [id]);

    const fetchEmployeeData = async () => {
        try {
            const api = `${import.meta.env.VITE_BACKEND_URL}/employee/profile/${id}`;
            const response = await axios.get(api);
            setEmployee(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching employee data:", error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Employee Profile</h2>
                
                {employee ? (
                    <div className="profile-info">
                        <div className="info-item">
                            <label>Name:</label>
                            <span>{employee.name}</span>
                        </div>
                        <div className="info-item">
                            <label>Employee ID:</label>
                            <span>{employee._id}</span>
                        </div>
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{employee.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Designation:</label>
                            <span>{employee.designation}</span>
                        </div>
                    </div>
                ) : (
                    <div className="error">Employee data not found</div>
                )}

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;