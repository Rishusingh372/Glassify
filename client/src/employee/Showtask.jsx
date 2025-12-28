import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/employee/showtask.css";
import { toast } from "react-toastify";

const Showtask = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tid, setTid] = useState("");
  const [input, setInput] = useState({
    status: "",
    completionday: "",
    comment: ""
  });

  const fetchTasks = async () => {
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/employee/showtask/${id}`;
      const response = await axios.get(api);
      console.log("Fetched tasks:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  // Open report modal
  const handleReportClick = (task) => {
    setSelectedTask(task);
    setTid(task._id);
    setInput({
      status: task.status || "",
      completionday: task.completionday || "",
      comment: task.comment || ""
    });
    setShowModal(true);
  };

  const handlchange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 const sendReport = async (e) => {
    e.preventDefault();
    
    // ✅ Validation
    if (!input.status) {
        toast.error("Please select a status");
        return;
    }

    try {
        const api = `${import.meta.env.VITE_BACKEND_URL}/employee/sendreport`;
        const reportData = { 
            tid, 
            status: input.status,
            completionday: input.completionday ? parseInt(input.completionday) : 0,
            comment: input.comment || "No comments provided"
        };
        
        console.log("Sending report:", reportData);
        
        const response = await axios.post(api, reportData);
        toast.success(response.data);
        setShowModal(false);
        fetchTasks(); // Refresh the task list
        
        // ✅ Reset form
        setInput({
            status: "",
            completionday: "",
            comment: ""
        });
    } catch (error) {
        console.log("Error sending report:", error);
        toast.error("Failed to send report");
    }
};

  return (
    <div className="task-container">
      <h2 className="task-title">My Assigned Tasks</h2>

      <div className="task-table-wrapper">
        <table className="task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Title</th>
              <th>Description</th>
              <th>Duration (Days)</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.duration}</td>
                  <td>
                    <span
                      className={`priority-badge ${task.priority?.toLowerCase() || "low"
                        }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${task.status?.toLowerCase().replace(" ", "-") || "assigned"
                        }`}
                    >
                      {task.status || "Assigned"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="report-btn"
                      onClick={() => handleReportClick(task)}
                    >
                      Update Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-task">
                  No tasks assigned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Status: {selectedTask?.title}</h3>
            <form className="report-form" onSubmit={sendReport}>
              <label>Status</label>
              <select 
                name="status" 
                required 
                onChange={handlchange}
                value={input.status}
              >
                <option value="">Select Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>

              <label>Days Taken</label>
              <input
                type="number"
                name="completionday"
                placeholder="Enter days taken to complete"
                value={input.completionday}
                onChange={handlchange}
                min="0"
              />

              <label>Message / Progress Note</label>
              <textarea
                name="comment"
                placeholder="Add progress details or remarks..."
                rows="4"
                value={input.comment}
                onChange={handlchange}
              ></textarea>

              <div className="modal-actions">
                <button type="submit" className="submit-report-btn">
                  Update Task
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Showtask;