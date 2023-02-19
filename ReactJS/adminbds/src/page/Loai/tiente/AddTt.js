import React from "react";
import { Form,Button } from 'react-bootstrap';
import {  useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import styles from '../loai.module.css';
function AddTt(props) {
   
    const [formValues, setFormValue] = useState({LTT_Ten: ""});

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/loaitiente/create", {
            LTT_Ten: formValues.LTT_Ten,
                
                
            })
            .then(() => {
                alert("Success insert!");
                window.location.href="/loai";
            })
    }

    return (
        
            <Modal {...props} centered >
                <Form className={styles.contentloaiAdd}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Tên loại tiền tệ</Form.Label>
                        <Form.Control type="email" placeholder="Tên loại" 
                            name="LTT_Ten" value={formValues.LTT_Ten}
                            onChange={handleChange}  />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="success" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                </Modal>
            
    )

}

function HandellAddTt() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button className="btn btn-success" onClick={() => setModalShow(true)} >
                <AddBoxIcon />
            </Button>

            <AddTt
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default HandellAddTt;
// export default AddTt;