// import React, { useState } from "react";
// import { Outlet, Link } from "react-router-dom";
// import { Menu, X } from "lucide-react"; // modern icons
// import "../css/admin/layout.css";

// const AdminDashboard = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="layout-container">
//       {/* Sidebar */}
//       <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
//         <div className="sidebar-header">
//           <h2 className="logo">{isOpen ? "TaskFlow Admin" : "TM"}</h2>
//           <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>

//         <nav className="sidebar-links">
//           <Link to="createUser">Create User</Link>
//           <Link to="assignTask">Assign Task</Link>
//           <Link to="see-report">View Reports</Link> 
//           <Link to="viewUsers">View Users</Link>
//           <Link to="contacts">All Contact Leads</Link>
//           <Link to="adminProfile">Admin Profile</Link>

//         </nav>
//       </aside>

     
      

//       {/* Main content */}
//       <main className="content-area">
//         <Outlet />
//       </main>
//     </div>
//   );
// };


// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  Users, 
  ClipboardList,
  BarChart3, 
  UserPlus, 
  Mail, 
  User, 
  Settings,
  Search,
  Bell,
  ChevronDown,
  CheckSquare,
  MessageCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "../css/admin/layout.css";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeTasks: 0,
    completedTasks: 0,
    pendingContacts: 0,
    recentActivities: [],
    tasksByPriority: [],
    tasksByStatus: []
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Fetch real dashboard stats
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/dashboard/stats`;
      const response = await axios.get(api);
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to load dashboard data");
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults(null);
      return;
    }

    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/admin/search?query=${encodeURIComponent(query)}`;
      const response = await axios.get(api);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
      toast.error("Search failed");
    }
  };

  useEffect(() => {
    if (!location.pathname.includes('/admindashboard/')) {
      fetchDashboardStats();
    }
  }, [location]);

  const navigationItems = [
    { path: "createUser", icon: UserPlus, label: "Create User", color: "#3B82F6" },
    { path: "assignTask", icon: ClipboardList, label: "Assign Task", color: "#10B981" },
    { path: "see-report", icon: BarChart3, label: "View Reports", color: "#F59E0B" },
    { path: "viewUsers", icon: Users, label: "View Users", color: "#8B5CF6" },
    { path: "contacts", icon: Mail, label: "Contact Leads", color: "#EC4899" },
    { path: "adminProfile", icon: Settings, label: "Admin Profile", color: "#6B7280" }
  ];

  const StatCard = ({ icon: Icon, value, label, color, loading }) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: color + '20', color }}>
        <Icon size={20} />
      </div>
      <div className="stat-content">
        <h3>{loading ? "..." : value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );

  const RecentActivityItem = ({ activity }) => (
    <div className="activity-item">
      <div className="activity-icon">
        <ClipboardList size={16} />
      </div>
      <div className="activity-details">
        <p className="activity-title">{activity.title}</p>
        <p className="activity-info">
          Assigned to <strong>{activity.empid?.name || 'Unknown'}</strong> • 
          <span className={`status ${activity.status?.toLowerCase()}`}>
            {activity.status}
          </span>
        </p>
        <p className="activity-time">
          {new Date(activity.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="logo-icon">T</div>
            <h2 className="logo-text">{isOpen ? "TaskFlow Admin" : "TF"}</h2>
          </div>
          {/* <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button> */}
        </div>

        <nav className="sidebar-links">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`nav-item ${location.pathname.includes(item.path) ? 'active' : ''}`}
              >
                <div className="nav-icon" style={{ color: item.color }}>
                  <Icon size={20} />
                </div>
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {isOpen && (
          <div className="sidebar-footer">
            <div className="admin-info">
              <div className="admin-avatar">
                <User size={24} />
              </div>
              <div className="admin-details">
                <p className="admin-name">Admin User</p>
                <p className="admin-role">Administrator</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="content-area">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">
              {/* {location.pathname.includes('/') && 'Admin Dashboard'} */}
               {location.pathname === '/admindashboard' && 'Dashboard '}
              {location.pathname.includes('createUser') && 'Create User'}
              {location.pathname.includes('assignTask') && 'Assign Task'}
              {location.pathname.includes('see-report') && 'View Reports'}
              {location.pathname.includes('viewUsers') && 'View Users'}
              {location.pathname.includes('contacts') && 'Contact Leads'}
              {location.pathname.includes('adminProfile') && 'Admin Profile'}
              {!location.pathname.includes('/admindashboard/') && 'Dashboard Overview'}
            </h1>
            <p className="page-subtitle">
              {!location.pathname.includes('/admindashboard/') 
                ? 'Welcome to your admin dashboard' 
                : 'Manage your team and tasks efficiently'
              }
            </p>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search tasks, employees..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              
              {/* Search Results Dropdown */}
              {searchResults && searchQuery && (
                <div className="search-results">
                  <div className="search-results-header">
                    <span>Search Results ({searchResults.totalResults})</span>
                  </div>
                  
                  {searchResults.employees.length > 0 && (
                    <div className="search-category">
                      <h4>Employees ({searchResults.employees.length})</h4>
                      {searchResults.employees.slice(0, 3).map(emp => (
                        <div key={emp._id} className="search-item">
                          <Users size={14} />
                          <span>{emp.name} - {emp.designation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {searchResults.tasks.length > 0 && (
                    <div className="search-category">
                      <h4>Tasks ({searchResults.tasks.length})</h4>
                      {searchResults.tasks.slice(0, 3).map(task => (
                        <div key={task._id} className="search-item">
                          <ClipboardList size={14} />
                          <span>{task.title} - {task.priority}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {searchResults.contacts.length > 0 && (
                    <div className="search-category">
                      <h4>Contacts ({searchResults.contacts.length})</h4>
                      {searchResults.contacts.slice(0, 3).map(contact => (
                        <div key={contact._id} className="search-item">
                          <Mail size={14} />
                          <span>{contact.name} - {contact.service}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="header-actions">
              <button className="icon-btn notification-btn">
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>
              
              <div className="user-menu">
                <div className="user-avatar">
                  <User size={20} />
                </div>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Matrix Summary - Only show on dashboard home */}
        {!location.pathname.includes('/admindashboard/') && (
          <section className="matrix-summary">
            <div className="summary-header">
              <h2>Dashboard Overview</h2>
              <p>Real-time data from your system</p>
            </div>
            
            <div className="stats-grid">
              <StatCard 
                icon={Users} 
                value={stats.totalEmployees} 
                label="Total Employees" 
                color="#3B82F6" 
                loading={loading}
              />
              <StatCard 
                icon={ClipboardList} 
                value={stats.activeTasks} 
                label="Active Tasks" 
                color="#10B981" 
                loading={loading}
              />
              <StatCard 
                icon={CheckSquare} 
                value={stats.completedTasks} 
                label="Completed Tasks" 
                color="#F59E0B" 
                loading={loading}
              />
              <StatCard 
                icon={MessageCircle} 
                value={stats.pendingContacts} 
                label="Pending Contacts" 
                color="#EC4899" 
                loading={loading}
              />
            </div>

            {/* Recent Activities */}
            {stats.recentActivities && stats.recentActivities.length > 0 && (
              <div className="recent-activities">
                <h3>Recent Activities</h3>
                <div className="activities-list">
                  {stats.recentActivities.map(activity => (
                    <RecentActivityItem key={activity._id} activity={activity} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                <Link to="createUser" className="action-card">
                  <UserPlus size={24} />
                  <span>Add New User</span>
                </Link>
                <Link to="assignTask" className="action-card">
                  <ClipboardList size={24} />
                  <span>Assign Task</span>
                </Link>
                <Link to="see-report" className="action-card">
                  <BarChart3 size={24} />
                  <span>View Reports</span>
                </Link>
                <Link to="contacts" className="action-card">
                  <Mail size={24} />
                  <span>Check Leads</span>
                </Link>
                
              </div>
            </div>
          </section>
        )}

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;