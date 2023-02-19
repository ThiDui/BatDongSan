import React from "react";
import { Form,InputGroup,Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './news.module.css';

function EditNews(){
    const navigate = useNavigate();
    const {id} = useParams();

    const initialValues = { TieuDe: "", HinhTieuDe: "", Mota: "", Tin_DuongDan: ""};
    const [formValues, setFormValue] = useState(initialValues);

    const {TieuDe,HinhTieuDe,Mota,Tin_DuongDan} =formValues;

    const handleChange = (e)=>{
        
        setFormValue({ ...formValues, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        loadNews();
        
    }, []);
    // console.log({"data": formValues.TieuDe});

    const loadNews = async () => {
        const result = await axios.get(`http://localhost:3001/news/${id}`);
        setFormValue(result.data);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/news/${id}`,formValues);
        navigate("/news");  
    }

    return(
        <div className={styles.boxNews}>
            <div className={styles.contentNews}>
            
                <Form className={styles.contentNewsadd}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tên tiêu đề</Form.Label>
                        <Form.Control type="email" placeholder="Tên tiêu đề" 
                            name="TieuDe" value={TieuDe}
                            onChange={handleChange}  />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Hình tiêu đề</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon1" 
                            name="HinhTieuDe" value={HinhTieuDe} onChange={handleChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Đường dẫn</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon1" name="Tin_DuongDan"
                                value={Tin_DuongDan} onChange={handleChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Mô tả tin tức..." name="Mota"
                            value={Mota} onChange={handleChange}/>
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                
            </div>
        </div>
        )

}

export default EditNews;