import React from "react";
import { Form,Button } from 'react-bootstrap';
import {  useState } from 'react';


import axios from 'axios';
import styles from './dangtin.module.css';
function AddLienhe() {
   
    const [formValues, setFormValue] = useState({LH_TenChuSoHuu: "",LH_SoDienThoai: "", LH_Email:"",LH_DiaChi:""});

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/lienhe/create", {
            LH_TenChuSoHuu: formValues.LH_TenChuSoHuu,
            LH_SoDienThoai: formValues.LH_SoDienThoai,
            LH_Email: formValues.LH_Email,
            LH_DiaChi: formValues.LH_DiaChi    
                
            })
            .then(() => {
                alert("Success insert!");
            })
    }

    return (
        
            
                <Form className={styles.contentloaiAdd}>
                <Form.Group className="mb-3" >
                        <Form.Label>Tên chủ sở hữu</Form.Label>
                        <Form.Control type="email" placeholder="Tên" 
                            name="LH_TenChuSoHuu" value={formValues.LH_TenChuSoHuu}
                            onChange={handleChange}  />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control aria-describedby="basic-addon1" 
                        name="LH_SoDienThoai" value={formValues.LH_SoDienThoai} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control aria-describedby="basic-addon1" name="LH_Email"
                            value={formValues.LH_Email} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Địa chỉ" name="LH_DiaChi"
                            value={formValues.LH_DiaChi} onChange={handleChange}/>
                    </Form.Group>
                    <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                
            
    )

}

// function HandellAddLh() {
//     const [modalShow, setModalShow] = useState(false);

//     return (
//         <>
//             <div className="btn btn-success" onClick={() => setModalShow(true)} >
//                 Thêm liên hệ mới
//             </div>

//             <AddLienhe
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

//export default HandellAddLh;
 export default AddLienhe;