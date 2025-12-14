import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const AdminLogin=()=>{
  const [adminid, setAdminId] = useState("");
  const [password, setPassword]= useState("");
   const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let api=`${import.meta.env.VITE_BACKENDURL}/admin/login`;
    const response = await axios.post(api, {adminid:adminid, password:password});
    console.log(response);
    alert(response.data.msg)
    navigate("/admindashboard");
      
  }


  return(
        <>
          <h1 className='heading1'> Admin Login</h1>
           <Form style={{width:"300px", margin:"auto"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Admin ID</Form.Label>
        <Form.Control type="text" value={adminid} onChange={(e)=>{setAdminId(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
        </>
    )
}

export default AdminLogin;