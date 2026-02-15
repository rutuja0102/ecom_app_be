import React from 'react'
import AdminMenu from "../assets/AdminMenu";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function UpdateProduct() {
  const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [photo, setPhoto] = useState("");
    const [id,setId] = useState("")
    const params = useParams()
    const {auth} = useAuth();
    const navigate = useNavigate();
  
    function getallcategories() {
      fetch("https://ecom-app-u73g.onrender.com/category/all-categories").then((res1) => {
        res1.json().then((res2) => {
          console.log(res2);
          setCategories(res2.categories);
        });
      });
    }
  
    useEffect(() => {
      getallcategories();
    });

    function getsingleprod(){
      fetch(`https://ecom-app-u73g.onrender.com/product/single-product/${params.slug}`).then((res1)=>{
        res1.json().then((res2)=>{
          console.log(res2);
          setName(res2.product.name);
          setPrice(res2.product.price);
          setDescription(res2.product.description)
          setQuantity(res2.product.quantity);
          setId(res2.product._id)
          setCategory(res2.product.category._id)
        })
      })
    }

    useEffect(()=>{
      getsingleprod()
    },[])

    function editproduct(e){
      e.preventDefault();
      let prod=new FormData();
      prod.append("name",name);
      prod.append("description",description);
      prod.append("price",price);
      prod.append("quantity",quantity);
      photo && prod.append("photo",photo);
      prod.append("category",category);
      fetch(`https://ecom-app-u73g.onrender.com/product/update-product/${id}`,{
        method:"put",
        headers:{
          "authorization":auth.token
        },
        body:prod
      }).then((res1)=>{
        res1.json().then((res2)=>{
          console.log(res2);
          navigate("/Dashboard/admin/products")
        })
      })
    }

    function delprod(id){
      fetch(`https://ecom-app-u73g.onrender.com/product/delete-product/${id}`,{
        method:"delete",
        headers:{
          "authorization":auth.token
        }
      }).then((res1)=>{
        res1.json().then((res2)=>{
          console.log(res2);
          navigate("/Dashboard/admin/products")
        })
      })
    }

  return (
    <div>
      <Container>
        <Row>
            <Col md={3}>
             <AdminMenu/>
            </Col>
            <Col md={9}>
            <Container className="m-4 text-center">
                          <h2 className="my-3">Update Product</h2>
                          <Form className="w-25 mx-auto d-block" onSubmit={editproduct}>
                            <Form.Select aria-label="Default select example" className="mb-3" name={category} onChange={(e)=>setCategory(e.target.value)}>
                              <option>Select Category</option>
                              {
                                categories.map((c,i)=>{
                                  return (
                                    <option key={i} value={c._id}>{c.name}</option>
                                  )
                                })
                              }
                            </Form.Select>
                            <Form.Control type="text" placeholder="Enter Product Name" 
                            className="mb-3" value={name} onChange={(e)=>setName(e.target.value)}/>
                            <Form.Control type="text" placeholder="Enter Product Price" 
                            className="mb-3" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                            <Form.Control type="text" placeholder="Enter Product Quantity" 
                            className="mb-3" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                            <Form.Control type="text" placeholder="Enter Product Description" 
                            className="mb-3" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                            <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file" name="photo" accept='images/*' onChange={(e)=>setPhoto(e.target.files[0])} />
                  </Form.Group>
                  <Button variant='primary' type='submit'>Submit</Button>
                  <Button variant='danger' className='ms-4' onClick={()=>delprod(id)}>Delete</Button>
                          </Form>
                        </Container>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default UpdateProduct
