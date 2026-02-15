import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  // states here
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  let navigate=useNavigate();

  // function to add user
  function adduser(e){
    e.preventDefault();
    let user={name,email,password,address,phone,answer};
    fetch("http://127.0.0.1:6100/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user)
    }).then((res1)=>{
        res1.json().then((res2)=>{
            console.log(res2);
            navigate('/signin');
        })
    })
  }

  return (
    <div>
      <Container className="text-center">
        <h2 className="my-4">User Registration Form</h2>
        <Form className="w-25 mx-auto d-block p-4" onSubmit={adduser}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Control type="text" placeholder="Enter Name" 
            value={name} onChange={(e)=>setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control type="email" placeholder="Email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control type="password" placeholder="Password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupAddress">
            <Form.Control type="text" placeholder="Address" 
            value={address} onChange={(e)=>setAddress(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Control type="text" placeholder="Enter Phone Number" 
            value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupAnswer">
            <Form.Control
              type="text"
              placeholder="Which is your favorite game?"
              value={answer} onChange={(e)=>setAnswer(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Signup;
