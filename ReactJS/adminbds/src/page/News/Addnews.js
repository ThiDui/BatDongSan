import React from "react";
import { Form,InputGroup,Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import styles from './news.module.css';
function Addnews(props) {
    const initialValues = { TieuDe: "", HinhTieuDe: "", Mota: "", Tin_DuongDan: ""};
    const [formValues, setFormValue] = useState(initialValues);

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/news/create", {
                TieuDe: formValues.TieuDe,
                HinhTieuDe: formValues.HinhTieuDe,
                Tin_DuongDan: formValues.Tin_DuongDan,
                Mota: formValues.Mota
                
            })
            .then(() => {
                alert("Success insert!");
                window.location.href="/news"
            })
    }

    return (
        
            <Modal {...props} centered >
                <Form className={styles.contentNewsadd}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tên tiêu đề</Form.Label>
                        <Form.Control type="email" placeholder="Tên tiêu đề" 
                            name="TieuDe" value={formValues.TieuDe}
                            onChange={handleChange}  />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Hình tiêu đề</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon1" 
                            name="HinhTieuDe" value={formValues.HinhTieuDe} onChange={handleChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Đường dẫn</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                            <Form.Control aria-describedby="basic-addon1" name="Mota"
                                value={formValues.Mota} onChange={handleChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Mô tả tin tức..." name="Tin_DuongDan"
                            value={formValues.Tin_DuongDan} onChange={handleChange}/>
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                </Modal>
            
    )

}

function HandellAddnews() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button className="btn btn-success" onClick={() => setModalShow(true)} >
                <AddBoxIcon />
            </Button>

            <Addnews
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default HandellAddnews;
// export default Addnews;