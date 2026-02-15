import React from 'react'
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function CategoryForm({handleSubmit,value,setValue}) {
  return (
    <div>
      <Container className='text-center'>
        <Form onSubmit={handleSubmit} className='m-3 w-25 mx-auto d-block'>
        <Form.Control type="text" placeholder="Enter Name" className='mb-3'
        value={value} onChange={(e)=>setValue(e.target.value)}/>
        <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </Container>
    </div>
  )
}

export default CategoryForm
