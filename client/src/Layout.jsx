import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TopNavbar from "./components/TopNavbar";



const Layout=()=>{
    return(
        <>
          <Header/>
          <TopNavbar/>
          <Outlet/>
          <Footer/>
        </>
    )
}

export default Layout;