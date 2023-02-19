import React from "react";
import { Form,Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './lienhe.module.css';

function EditLienhe(){
    const navigate = useNavigate();
    const {id} = useParams();

    const initialValues = { LH_TenChuSoHuu: "", LH_SoDienThoai: "", LH_Email: "", LH_DiaChi: ""};
    const [formValues, setFormValue] = useState(initialValues);

    const {LH_TenChuSoHuu,LH_SoDienThoai,LH_Email,LH_DiaChi} =formValues;

    const handleChange = (e)=>{
        
        setFormValue({ ...formValues, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadLienhe();
    }, []);

    const loadLienhe = async () => {
        const result = await axios.get(`http://localhost:3001/lienhe/${id}`);
        setFormValue(result.data);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/lienhe/${id}`,formValues);
        navigate("/lienhe");  
    }

    return(
        <div className={styles.boxNews}>
            <div className={styles.contentNews}>
            
                <Form className={styles.contentNewsadd}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tên</Form.Label>
                        <Form.Control type="email" placeholder="Tên" 
                            name="LH_TenChuSoHuu" value={LH_TenChuSoHuu}
                            onChange={handleChange}  />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control aria-describedby="basic-addon1" 
                        name="LH_SoDienThoai" value={LH_SoDienThoai} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control aria-describedby="basic-addon1" name="LH_Email"
                            value={LH_Email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Địa chỉ" name="LH_DiaChi"
                            value={LH_DiaChi} onChange={handleChange}/>
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                
            </div>
        </div>
        )

}

export default EditLienhe;