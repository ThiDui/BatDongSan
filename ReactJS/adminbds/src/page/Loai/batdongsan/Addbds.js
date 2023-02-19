import React from "react";
import { Form,Button } from 'react-bootstrap';
import {  useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import styles from '../loai.module.css';
function Addbds(props) {
   
    const [formValues, setFormValue] = useState({L_Ten: ""});

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/loaibatdongsan/create", {
            L_Ten: formValues.L_Ten,
                
                
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
                        <Form.Label>Tên loại</Form.Label>
                        <Form.Control type="email" placeholder="Tên loại" 
                            name="L_Ten" value={formValues.L_Ten}
                            onChange={handleChange}  />
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="success" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                </Modal>
            
    )

}

function HandellAddbds() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button className="btn btn-success" onClick={() => setModalShow(true)} >
                <AddBoxIcon />
            </Button>

            <Addbds
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default HandellAddbds;
// export default Addbds;