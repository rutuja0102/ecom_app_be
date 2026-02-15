import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Card from 'react-bootstrap/esm/Card'
import { useAuth } from '../context/auth'
import AdminMenu from '../assets/AdminMenu'

function AdminDashboard() {
  const {auth, setAuth} = useAuth()
  console.log("auth:", auth);
  
  return (
    <div>
      <Container>
        <Row>
            <Col md={3}>
             <AdminMenu/>
            </Col>
            <Col md={9}>
            <Card className='m-5 w-50'>
              <Card.Body>
                <h4>Name: {auth.user.name}</h4>
                <h4>Email Address: {auth.user.email}</h4>
                <h4>Address: {auth.user.address}</h4>
                <h4>Phone: {auth.user.phone}</h4>
              </Card.Body>
            </Card>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashboard
