import React, { useState, useEffect } from 'react'
import { useCart } from '../context/cart'
import { Form } from 'react-bootstrap';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Button from 'react-bootstrap/Button';

function Home() {
  const {cart, setCart}=useCart();
  const [products, setProducts]=useState([]);
  const [categories, setCategories]=useState([]);
  const [checked, setChecked]=useState([]);
  
  function getAllProducts() {
      fetch("https://ecom-app-u73g.onrender.com/product/all-products").then((res1) => {
        res1.json().then((res2) => {
          console.log(res2);
          setProducts(res2.products);
        });
      });
    }
  
    useEffect(() => {
      getAllProducts();
    },[]);

    function getAllCategories() {
        fetch("http://127.0.0.1:6100/category/all-categories").then((res1) => {
          res1.json().then((res2) => {
            console.log(res2);
            setCategories(res2.categories);
          });
        });
      }
    
      useEffect(() => {
        getAllCategories();
      },[]);
  
  function handleFilter(value,id){
    let all=[...checked]
    if(value){
      all.push(id)
    } else {
      all=all.filter(c=>c!==id)
    }
    setChecked(all)
  }

  function filterProducts(){
    let data={checked}
    fetch("https://ecom-app-u73g.onrender.com/product/filter-product",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
  }).then((res1)=>{
    res1.json().then((res2)=>{
      console.log(res2);
      setProducts(res2.products)
    })
  })
  }

  useEffect(()=>{
    if(checked.length)
      filterProducts()
  },[checked])

  return (
    <div>
      <Container>
        <Row className='m-4'>
        <Col md={2}>
        <h5 className='mb-5'>Filter By Category</h5>{
          categories.map((c)=>{
            return (
              <Form.Check
            type="checkbox"
            className='mb-4 fs-5' 
            key={c._id}
            label={c.name}
            onChange={(e)=>handleFilter(e.target.checked,c._id)}
          />
            )
          })
        }
        <Button variant='secondary' className='mt-4' onClick={()=>window.location.reload()}>Clear Filters</Button>
        </Col>
        <Col md={10}>
        <h1 className="text-center mt-4">All Products</h1>
                      <div class="row row-cols-1 row-cols-md-3 g-4 m-4 text-center">
                        {products.map((p, i) => {
                          return (
                            <Col key={i}>
                              <Card style={{ width: "18rem" }} className='h-100 border-0 shadow'>
                                <Card.Img variant="top" src={`https://ecom-app-u73g.onrender.com/product/product-photo/${p._id}`} className="img-fluid mx-auto d-block h-50 w-100" />
                                <Card.Body>
                                  <Card.Title>{p.name}</Card.Title>
                                  <Card.Text>
                                    <h5>{p.description}</h5>
                                    <h5><LiaRupeeSignSolid/>{p.price}</h5>
                                  </Card.Text>
                                  <Button variant='primary' onClick={()=>{
                                    setCart([...cart,p])
                                    localStorage.setItem("cart",JSON.stringify([...cart,p]))
                                  }}>Add To Cart</Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </div>
        </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home
