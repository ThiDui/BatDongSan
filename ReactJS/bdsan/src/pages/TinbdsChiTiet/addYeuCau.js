import React from "react";
import { Form,Button } from 'react-bootstrap';
import {  useState,useEffect,useRef } from 'react';
import emailjs from '@emailjs/browser';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import styles from './ChitietBds.module.css';
import authHeader from '~/Services/authHeader';

function AddLienhe(props) {
//    console.log("prop",props)
    const [formValues, setFormValue] = useState({TinBDS_Ma: props.data.BDS_Ma, YC_NoiDung:"",TinBatDongSanBDSMa:props.data.BDS_Ma});
    // const [profile, setProfile] = useState({username:"",phone:"",email:"",avatar:"",});
    const[addState, setAddState] = useState("")

    const form = useRef();
    const user = JSON.parse(localStorage.getItem('user'));
    // useEffect(() => {
        
    //     loadUser();
    // }, []);


    // const loadUser = async () => {
    //     try{
    //     const result = await axios.get("http://localhost:3001/user/profile",{ headers: authHeader() });
    //     setProfile(result.data);
    //     }
    //     catch (err) {
    //         console.log(err);
            
    //       }
        
    // };

    // console.log("profile",profile)

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.current)
        emailjs.sendForm('service_4c2nn5d', 'template_n7usa78', form.current, 'AeKUNG58OyyJj99ts')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

        axios.post("http://localhost:3001/yeucaulienhe/create",{
            TinBDS_Ma: formValues.TinBDS_Ma,
            
            YC_NoiDung: formValues.YC_NoiDung,
            TinBatDongSanBDSMa: formValues.TinBatDongSanBDSMa    
                
            },{ headers: authHeader() })
            .then((response) => {
                setAddState(response.data.message);
                window.location.href=`/batdongsan/${formValues.TinBDS_Ma}`;
            })
            .catch(err =>{
                setAddState(err.response.data.message);
            })
    }

    return (
        
            <Modal {...props} centered >
                <div className={styles.titleModal}>Y??u c???u li??n h???</div>
                <Form ref={form}  className={styles.boxModal}>
                    {
                        (addState !="") ? <div className={styles.check} ><i class="far fa-check-circle"></i> {addState}</div> 
                        : ""
                    }
                    
                <div className={styles.textModal}>Y??u c???u ng?????i ????ng tin li??n h??? theo th??ng tin d?????i ????y</div>
                <Form.Group className="mb-3" >
                        {/* <Form.Label>T??n t??i kho???n</Form.Label> */}
                        <Form.Control name="user_name" type="email"  
                             value={user.username}
                             />
                    </Form.Group>
                    <input type="hidden"  name="LH_name" value={props.data.LH_TenChuSoHuu} />
                    <input type="hidden" id="custId" name="LH_email" value={props.data.LH_Email} />
                    <input type="hidden"  name="bds_ma" value={props.data.BDS_Ma} />
                    
                    <Form.Group className="mb-3">
                        {/* <Form.Label>S??? ??i???n tho???i</Form.Label> */}
                        <Form.Control readOnly value={user.phone} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {/* <Form.Label>Email</Form.Label> */}
                        <Form.Control type="email" name="user_email" value={user.email} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>L???i nh???n</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="T??i quan t??m ?????n b???t ?????ng s???n n??y" name="YC_NoiDung"
                            value={formValues.YC_NoiDung} onChange={handleChange}/>
                    </Form.Group>
                    
                    <Button onClick={handleSubmit}  variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                </Modal>
                
    )

}

function HandellAddLh(dataUser) {

   
    const [modalShow, setModalShow] = useState(false);
    
    const [lh, setLh] = useState([]);
    console.log("dataLH",dataUser)
    useEffect(() => {

        axios.get(`http://localhost:3001/yeucaulienhe/find/${dataUser.BDS_Ma}`,{ headers: authHeader() })
        //     TinBDS_Ma: dataUser.BDS_Ma,
        //     UserId: dataUser.userid
        // })
            .then((response) => {
                setLh(response.data)
                
                
            })
            

    }, []);
  
  
    return (
        
        
        <>
        {
            (lh.length===0) ? 
            <div>
                <div  onClick={() => setModalShow(true)} >
                Y??u c???u li??n h??? l???i
                </div>
                <AddLienhe
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    data={dataUser} 
                />
            </div>
            : <div className={styles.check}><i className="far fa-check-circle"></i> ???? y??u c???u li??n h???</div>

        }
                
                
        
        </>  
        
    );
}

export default HandellAddLh;
// export default AddLienhe;