import React from "react";
import AdminMenu from "../assets/AdminMenu";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);

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
  });

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <Container>
              <h1 className="text-center mt-4">All Products</h1>
              <div class="row row-cols-1 row-cols-md-3 g-4 m-4 text-center">
                {products.map((p, i) => {
                  return (
                    <Link to={`/Dashboard/admin/updateproduct/${p.slug}`} key={p._id} className="product-link">
                    <Col key={i}>
                      <Card style={{ width: "18rem" }} className='h-100 border-0 shadow'>
                        <Card.Img variant="top" src={`https://ecom-app-u73g.onrender.com/product/product-photo/${p._id}`} className="img-fluid mx-auto d-block h-50 w-100" />
                        <Card.Body>
                          <Card.Title>{p.name}</Card.Title>
                          <Card.Text>
                            <h5>{p.description}</h5>
                            <h5><LiaRupeeSignSolid/>{p.price}</h5>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    </Link>
                  );
                })}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Product;
