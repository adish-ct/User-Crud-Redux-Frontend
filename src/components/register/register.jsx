import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../api/api";
// Css and Boostrap
import './register.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Register() {
  const history = useNavigate()
  const signupform = async (e) => {
    e.preventDefault()
    const data = [e.target.username.value,
    e.target.email.value,
    e.target.password.value,
    e.target.password1.value
    ]

    const response = await fetch(`${baseUrl}user-register/`, {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'username': data[0],
        'email': data[1],
        'password': data[2],
      })
    });

    if (response.status === 400) {
      alert(response.status)
      console.log("working");
      history('/register')
    } else {
      console.log("redirection");
      history('/login')
    }

  }

  return (
    <div className="maindiv">
      <div style={{
        display: 'block',
        width: 500,
        padding: 30
      }}>
        <h4>Login</h4>
        <Form onSubmit={(e) => signupform(e)}>
          <Form.Group className="py-2">
            <Form.Control type="text" name="username" placeholder="Username" />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="email" name="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="password" name="password1" placeholder="Confirm Password" />
          </Form.Group>
          <Form.Group></Form.Group>
          <Button variant="primary" className="my-4" type="submit">
            submit
          </Button>
        </Form>
        <p className="text-center text-muted mt-4 mb-0">already have an account <Link to="/login" className="fw-bold text-body"><u>login here</u></Link></p>
      </div>
    </div>
  )
}
export default Register