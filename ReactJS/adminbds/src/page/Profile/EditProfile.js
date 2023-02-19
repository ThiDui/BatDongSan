import React from "react";
import { Form,InputGroup,Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import styles from './profile.module.css';
function EditProfile(props) {
    
    const [formValues, setFormValue] = useState({  phone: props.data.dataphone, email: props.data.dataemail, address: props.data.dataaddress});
    const user = JSON.parse(localStorage.getItem('user'));
    
   
   

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/user/${user.id}`, {
            
            phone: formValues.phone,
            email: formValues.email,
            address: formValues.address
                
            })
            .then(() => {

                alert("Success update!");
                window.location.href='/profile';
            })
    }

    return (
        
            <Modal {...props} centered >
                <Form className={styles.contentedit}>
                    <div className={styles.titleEditPf}>
                    <h5 className={styles.titleNameEditPf}>Thay đổi thông tin liên hệ của bạn</h5>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text >+84</InputGroup.Text>
                            <Form.Control  
                            name="phone" value={formValues.phone} onChange={handleChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control  name="email"
                            value={formValues.email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control as="textarea" rows={3}  name="address"
                            value={formValues.address} onChange={handleChange}/>
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                </Modal>
            
    )

}

function HandellEditProfile(dataUser) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <p  onClick={() => setModalShow(true)} >
                Thay đổi thông tin liên hệ
            </p>

            <EditProfile
                show={modalShow}
                onHide={() => setModalShow(false)
                
                }

                data={dataUser} 
            />
        </>
    );
}

export default HandellEditProfile;
// export default EditProfile;