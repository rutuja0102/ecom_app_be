import React from 'react'
import { useSearch } from '../context/search'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Button from 'react-bootstrap/Button';

function SearchItems() {
    const [values,setValues]=useSearch();

  return (
    <div className='text-center'>
      <h2>Search Result</h2>
      <h4>
        {
            values.result.length<1?"No products Found":`Total ${values.result.length} product found.`
        }
      </h4>
      <Container>
        <div class="row row-cols-1 row-cols-md-4 g-4 m-4 text-center">
                        {values.result.map((p, i) => {
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
      </Container>
    </div>
  )
}

export default SearchItems
