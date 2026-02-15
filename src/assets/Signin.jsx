import React from 'react'
import { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

function Signin() {
// useState for email and password for login 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // use context hook to store the auth state
  const { auth, setAuth } = useAuth();
  // use to navigate to different pages
  let navigate=useNavigate();

  // function for user login
  function loginuser(e){
    e.preventDefault();
    let user={email,password};
    fetch("https://ecom-app-u73g.onrender.com/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user)
    }).then((res1)=>{
        res1.json().then((res2)=>{
            console.log(res2);
            alert("Login Successful");
            setAuth({
              ...auth,
              user:res2.user,
              token:res2.token
            })
            localStorage.setItem("auth",JSON.stringify(res2));
            navigate('/');
        })
    })
  }

  return (
    <div>
        <Container className="text-center">
                <h2 className="my-4">User Login Form</h2>
                <Form className="w-25 mx-auto d-block p-4" onSubmit={loginuser}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="email" placeholder="Email" 
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Password" 
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Container>
    </div>
  )
}

export default Signin
