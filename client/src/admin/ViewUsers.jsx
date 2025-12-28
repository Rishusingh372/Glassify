import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/admin/viewUsers.css';

const ViewUsers = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEmployees = async () => {
        try {
            const api = `${import.meta.env.VITE_BACKEND_URL}/admin/empdatalist`;
            const response = await axios.get(api);
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching employees:", error);
            toast.error("Failed to load employees");
            setLoading(false);
            
        }
    };

    const removeEmployee = async (employeeId, employeeName) => {
        if (window.confirm(`Are you sure you want to remove ${employeeName}?`)) {
            try {
                const api = `${import.meta.env.VITE_BACKEND_URL}/admin/removeemployee/${employeeId}`;
                await axios.delete(api);
                toast.success(`Employee ${employeeName} removed successfully`);
                fetchEmployees(); // Refresh list
            } catch (error) {
                console.log("Error removing employee:", error);
                toast.error("Failed to remove employee");
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    if (loading) {
        return <div className="loading">Loading employees...</div>;
    }

    return (
        <div className="view-users-container">
            <div className="users-header">
                <h1>All Employees</h1>
                <p>Manage your team members</p>
            </div>

            {employees.length === 0 ? (
                <div className="no-employees">
                    <h3>No Employees Found</h3>
                    <p>Create new employees to see them here.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Designation</th>
                                <th>Employee ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee, index) => (
                                <tr key={employee._id}>
                                    <td>{index + 1}</td>
                                    <td className="employee-name">{employee.name}</td>
                                    <td className="employee-email">{employee.email}</td>
                                    <td className="employee-designation">{employee.designation}</td>
                                    <td className="employee-id">{employee._id}</td>
                                    <td>
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeEmployee(employee._id, employee.name)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewUsers;