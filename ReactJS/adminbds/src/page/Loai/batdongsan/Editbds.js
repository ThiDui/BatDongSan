import React from "react";
import { Form,Button } from 'react-bootstrap';
import {  useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from '../loai.module.css';
function Editbds() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValue] = useState({L_Ten: ""});


    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        const result = await axios.get(`http://localhost:3001/loaibatdongsan/${id}`);
        setFormValue(result.data);
        
    }

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.put(`http://localhost:3001/loaibatdongsan/${id}`, {
            L_Ten: formValues.L_Ten,
                
                
            })
            window.location.href="/loai";
            navigate("/loai"); 
            
    }

    return (
        
            <div className={styles.boxgd}>
                <Form className={styles.editloai}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tên loại</Form.Label>
                        <Form.Control type="email" placeholder="Tên loại" 
                            name="L_Ten" value={formValues.L_Ten}
                            onChange={handleChange}  />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="success" className="w-25" type="submit">
                            Submit
                        </Button>
                        &emsp;   &emsp;
                        <Link to="/loai"><Button  variant="primary">Trở về</Button></Link>
                </Form>
                
             </div>
    )

}

 export default Editbds;