import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
const AddProduct=()=>{
  const [input, setInput] = useState({});
  const [images, setImages]= useState([]);



   const handleInput=(e)=>{
     let name=e.target.name;
     let value=e.target.value;
     setInput(values=>({...values, [name]:value}));
     console.log(input);
   }

   const handleImages=(e)=>{
    console.log(e.target.files);
    setImages(e.target.files);
   }
   const handleSubmit=async(e)=>{
    e.preventDefault();
     let api=`${import.meta.env.VITE_BACKENDURL}/admin/addproduct`;
    const formData = new FormData();
     for (let key in input){
       formData.append(key, input[key]);
     }
     
     for(var i=0; i<images.length; i++){
         formData.append("images", images[i]);
     }
   
     const response = await axios.post(api, formData);
     console.log(response);

    }



    return(
        <>
          <h1>Add new Product</h1>
           <Form style={{width:"400px"}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Product Name</Form.Label>
        <Form.Control type="text" name="name" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Select Category</Form.Label>
        <Form.Select aria-label="Default select example" name="category" onChange={handleInput}>
      <option>Open this select menu</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Kids">Kids</option>
    </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control type="text" name="price" onChange={handleInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Upload Product Images</Form.Label>
        <Form.Control type="file" multiple onChange={handleImages} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
        </>
    )
}
export default AddProduct;