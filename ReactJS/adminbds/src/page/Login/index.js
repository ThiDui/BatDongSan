import Button from 'react-bootstrap/Button';
import {Form,FloatingLabel} from 'react-bootstrap';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import styles from './login.module.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";



function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mess, setMess] = useState("");
  const handleSubmit = () =>{
    axios.post("http://localhost:3001/auth/login",{
            username: username,
            password: password
            
        })
        .then((response) => {
          alert("Đăng nhập thành công! ");
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.href='/';
                navigate("/"); 
              }
      
              //  return response.data;
        })
        .catch(err =>{
         
          setMess(err.response.data.message);
        })

  }
  
  return (
    <div className={styles.loginBorder}>
      
     
        <div className={styles.logindark}>
          <Form>
          <div className={styles.illustration}><LockOutlinedIcon   sx={{ fontSize: 100 }} /></div>
          <h5 style={{color:"red"}}>{mess ? <span> {mess} </span> : ""}</h5>
            {/* <h3 className="mb-5">Login</h3> */}
            <Form.Group className="mb-3" controlId="username">
            <FloatingLabel label="User name"  >
              <Form.Control type="email" placeholder="User name" onChange={(e) => {
                setUsername(e.target.value);
              }} />

            </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
            <FloatingLabel label="Password"  >
              <Form.Control type="password" placeholder="Password" onChange={(e) =>{
                setPassword(e.target.value);
              }} />
              </FloatingLabel>
            </Form.Group>
            <br />
            <Button variant="none" className={styles.btn} type="submit" onClick={handleSubmit}>
            {/* <span class="spinner-border spinner-border-sm"></span> */}
              Submit
            </Button>
          </Form>
          <div>
            <br />
            <p className="lglink"><a href="#a">Forgot password?</a></p>
           
          </div>
        </div>
     
    </div>
  );
}


export default Login;