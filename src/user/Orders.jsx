import React from 'react'
import { useSearch } from '../context/search'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import UserMenu from '../assets/UserMenu';

function Orders() {
  const {cart, setCart} = useCart();
  const {auth}=useAuth();
  const navigate = useNavigate();

  const totalPrice=()=>{
    let total=0
    cart.map(item=>{total=total+item.price})
    return total
  }

  function removeCartItem(cid){
    let myCart=[...cart]
    let index=myCart.findIndex(item=>item._id=cid)
    myCart.splice(index,1)
    setCart(myCart)
    localStorage.setItem("cart",JSON.stringify(myCart))
  }
  return (
    <div>
      <Container>
        <Row>
            <Col md={3}>
            <UserMenu/>
            </Col>
            <Col md={9}>
            <div>
                  <Container className='text-center'>
                    <h1 className='p-3 mb-3'>{`Hello ${auth.token && auth.user.name}`}</h1>
                    <h4>{cart.length>1?`you have ${cart.length} products in your cart ${auth.token?"": "please login to checkout"}`:"your cart is empty"}</h4>
                    {
                      auth.token?(
                        <Row className='mb-4'>
                          <Col>
                          <table>
                            <thead>
                              <tr><th>Product</th><th>Product Name</th><th>Price</th><th>Remove</th>
                              </tr>
                              </thead>
                              <tbody>
                                {
                                  cart.map((c,i)=>{
                                    return(
                                      <tr key={i}>
                                        <td>
                                          <img src={`https://ecom-app-u73g.onrender.com/product/product-photo/${c._id}`} height={100} width={100} className='mx-auto d-block'/>
                                        </td>
                                        <td>{c.name}</td>
                                        <td>{c.price}</td>
                                        <td><Button variant='danger' onClick={()=>removeCartItem(c._id)}>Remove</Button></td>
                                      </tr>
                                    )
                                  })
                                }
                              </tbody>
                              </table>
                          </Col>
                          <Col md={3} className='text-start'>
                          <h2>Cart Summary</h2>
                          <hr/>
                          <h4>Total Cart Item: {cart.length}</h4>
                          <h4>Total Amount: <LiaRupeeSignSolid/>{totalPrice()}</h4>
                          </Col>
                        </Row>
                      )  : null
                    }
                  </Container>
                </div>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Orders
