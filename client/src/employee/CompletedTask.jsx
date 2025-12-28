import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/employee/completedTask.css"; // Add CSS for styling
import { toast } from "react-toastify";

const CompletedTask = () => {
    const [mydata, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // ✅ Get employee ID from URL params

    const loadData = async () => {
        try {
            // ✅ Use multiple methods to get employee ID
            const employeeId = id || localStorage.getItem("empid");
            
            if (!employeeId) {
                toast.error("Employee ID not found. Please login again.");
                setLoading(false);
                return;
            }

            console.log("Fetching completed tasks for employee ID:", employeeId);
            
            let api = `${import.meta.env.VITE_BACKEND_URL}/employee/showcompletedtask/?id=${employeeId}`;
            const response = await axios.get(api);
            console.log("Completed tasks data:", response.data);
            setMydata(response.data);
            setLoading(false);
        } catch (error) {
            console.log("Error loading completed tasks:", error);
            toast.error("Failed to load completed tasks");
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [id]); // ✅ Add id as dependency

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading completed tasks...</p>
            </div>
        );
    }

    return (
        <div className="completed-task-container">
            <div className="task-header">
                <h1>Completed Tasks</h1>
                <p>Tasks that you have marked as completed</p>
            </div>

            {mydata.length === 0 ? (
                <div className="no-tasks">
                    <div className="no-tasks-icon">📝</div>
                    <h3>No Completed Tasks</h3>
                    <p>You haven't completed any tasks yet. Update task status to see them here.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="task-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Title</th>
                                <th>Description</th>
                                <th>Duration (Days)</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Completion Days</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mydata.map((task, index) => (
                                <tr key={task._id} className="task-row">
                                    <td className="sno">{index + 1}</td>
                                    <td className="task-title">{task.title}</td>
                                    <td className="task-desc">{task.description}</td>
                                    <td className="duration">{task.duration}</td>
                                    <td className="priority">
                                        <span className={`priority-badge ${task.priority?.toLowerCase()}`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="status">
                                        <span className={`status-badge ${task.status?.toLowerCase().replace(' ', '-')}`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="completion-days">
                                        {task.completionday || 'N/A'}
                                    </td>
                                    <td className="comments">
                                        {task.comment || 'No comments'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CompletedTask;