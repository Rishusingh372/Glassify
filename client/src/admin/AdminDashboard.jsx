import {Link, Outlet} from "react-router-dom";
const AdminDashBoard=()=>{
    return(
        <>
          <div id="adminheading">
             <h1 align="center"> Admin Dashboard</h1>  
          </div>          
          <div id="admincontainer">
            <div id="adminleftmenu">
             <Link to="addproduct" className="adminLink">   Add Product </Link> 
            </div>
            <div id="admindata">
               <Outlet/>
            </div>
          </div>
        </>
    )
}

export default AdminDashBoard;