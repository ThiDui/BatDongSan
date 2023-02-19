import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import './login.css';


function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mess, setMess] = useState("")

  const handleSubmit = () =>{
    Axios.post("http://localhost:3001/auth/login",{
            username: username,
            password: password
            
        })
        .then((response) => {
          alert("Đăng nhập thành công!")
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                 window.location.href='/';
                navigate("/"); 
              }
      
              
        })
        .catch(err =>{
          setMess(err.response.data.message);
        })
  }
  
  return (
    <div>
     
      <Modal {...props} centered >
        <div className="loginForm">
          <Form>
            <h3 className="mb-5">Login</h3>
            <h5 style={{color:"red"}}>{mess ? <span><i class="far fa-times-circle"></i> {mess} </span> : ""}</h5>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="email" placeholder="User name" onChange={(e) => {
                setUsername(e.target.value);
              }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) =>{
                setPassword(e.target.value);
              }} />
            </Form.Group>
            <Button variant="primary" className="w-100" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
          <div>
            <p className="lglink"><a href="#a">Forgot password?</a></p>
            <p className='lglink'>Don't have an account? <div style={{ color: '#393f81' }}>Register here</div></p>
          </div>
        </div>
      </ Modal>
    </div>
  );
}

function Handellogin() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalShow(true)} className="btn-login">
        Đăng nhập
      </Button>

      <Login
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Handellogin;