import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Layout from "../Layout";
import AdminDashboard from "./admin/AdminDashboard";
import CreateUser from "./admin/CreateUser";
import AssignTask from "./admin/AssignTask";
import SeeReport from "./admin/SeeReport";
// import Empdashboard from "./employee/empDashboard";
import Empdashboard from "./employee/Empdashboard"; 
import Showtask from "./employee/Showtask";
import CompletedTask from "./employee/CompletedTask";
import Profile from "./employee/Profile";
import ViewUsers from "./admin/ViewUsers";
import LandingPage from "./pages/LandingPage"; 
import Contacts from "./admin/Contacts";
import AdminProfile from "./admin/AdminProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Landing Page as default route */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} /> 
            <Route path="login" element={<Login />} /> 
            
          </Route>
        </Routes>

        <Routes>
          <Route path="admindashboard" element={<AdminDashboard />}>
            <Route path="createUser" element={<CreateUser />} />
            <Route path="assignTask" element={<AssignTask />} />
            <Route path="see-report" element={<SeeReport />} />
            <Route path="viewUsers" element={<ViewUsers />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="adminProfile" element={<AdminProfile />} />
          </Route>
        </Routes>

        <Routes>
          <Route path="/empdashboard/:id" element={<Empdashboard />}>
            <Route index element={<Showtask />} />
            <Route path="showtask" element={<Showtask />} />
            <Route path="completedtask" element={<CompletedTask />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;