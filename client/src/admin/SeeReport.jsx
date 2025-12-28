import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import "../css/admin/seeReport.css"; // Add this CSS file for styling

const SeeReport = () => {
    const [mydata, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/seereport`;
            const response = await axios.get(api);
            console.log("Reports data:", response.data);
            setMydata(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load reports");
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const taskReassign = async (id) => {
        try {
            let api = `${import.meta.env.VITE_BACKEND_URL}/admin/taskreassign/?tid=${id}`;
            const response = await axios.get(api);
            toast.success("Task reassigned successfully!");
            loadData(); // Refresh the data
        } catch (error) {
            console.log(error);
            toast.error("Failed to reassign task");
        }
    }

    if (loading) {
        return <div className="loading">Loading reports...</div>;
    }

    return (
        <div className="see-report-container">
            <div className="report-header">
                <h1>Employee Task Reports</h1>
                <p>View all completed task reports from employees</p>
            </div>

            {mydata.length === 0 ? (
                <div className="no-reports">
                    <h3>No reports available</h3>
                    <p>Employees haven't submitted any task reports yet.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <Table striped bordered hover className="reports-table">
                        <thead className="table-header">
                            <tr>
                                <th>#</th>
                                <th>Task Title</th>
                                <th>Duration</th>
                                <th>Priority</th>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                <th>Email</th>
                                <th>Comment</th>
                                <th>Status</th>
                                <th>Completion Days</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mydata.map((report, index) => (
                                <tr key={report._id}>
                                    <td>{index + 1}</td>
                                    <td>{report.title}</td>
                                    <td>{report.duration} days</td>
                                    <td>
                                        <span className={`priority-badge ${report.priority?.toLowerCase()}`}>
                                            {report.priority}
                                        </span>
                                    </td>
                                    <td>{report.empid?.name || 'N/A'}</td>
                                    <td>{report.empid?.designation || 'N/A'}</td>
                                    <td>{report.empid?.email || 'N/A'}</td>
                                    <td className="comment-cell">
                                        {report.comment || 'No comments'}
                                    </td>
                                    <td>
                                        <span className={`status-badge ${report.status?.toLowerCase().replace(' ', '-')}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td>{report.completionday || 'Not specified'}</td>
                                    <td>
                                        <button 
                                            className="reassign-btn"
                                            onClick={() => taskReassign(report._id)}
                                            title="Reassign this task"
                                        >
                                            Reassign
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default SeeReport;