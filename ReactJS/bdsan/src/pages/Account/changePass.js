import { Form,Button } from 'react-bootstrap';
import React,{ useState,useEffect } from 'react';
import authHeader from '~/Services/authHeader';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import styles from './profile.module.css';
import { useNavigate } from "react-router-dom";
function ChangePassword(props) {
    const navigate = useNavigate();
    const initialValues = { oldPassword: "", newPassword: "", confirmPassword: ""};
    const [formValues, setFormValue] = useState(initialValues);
    const [passCheck,setPassCheck] = useState("");
    const [formErr, setFormErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });

       
        
        
    }

    const validate = (values) => {
        const errors = {};
        let mktam = /^(?=.*\d)(?=.*[A-Za-z])(?!.*[!@#$%^&*()_+].{5,16$})/;
        console.log("value",values)
        if(!values.newPassword || !values.oldPassword || !values.confirmPassword){
            errors.all="Bạn phải nhập đầy đủ thông tin !"
            alert("Bạn phải nhập đầy đủ thông tin !")
        }
        else{
        
       if (!mktam.test(values.newPassword)) {
            errors.newPassword = "Mật khẩu phải từ 5 đến 16 kí tự, gồm chữ và số!"
        }else
        if (values.newPassword == values.oldPassword) {
            errors.newPassword = "Trùng với mật khẩu cũ, vui lòng nhập lại!";
        }else
         if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = "Mật khẩu không khớp, vui lòng nhập lại!";
        }
    }
        
        return errors;
    }

    function checkValue(){
        // let check = true;
        let oldpass =document.getElementById("oldPass").value;
        let newpass =document.getElementById("newPass").value;
        let confirmpass =document.getElementById("confirmPass").value;

        if(oldpass=="" && newpass =="" && confirmpass==""){
            alert("Bạn phải nhập đầy đủ các thông tin (*)");
            return false;
        }
       
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErr(validate(formValues));
        setIsSubmit(true);
    }
    


    useEffect(() => {
        if (Object.keys(formErr).length === 0 && isSubmit) {
            axios.patch("http://localhost:3001/user/update/password",{
                oldPassword: formValues.oldPassword,
                newPassword: formValues.newPassword
                
                },{ headers: authHeader() })
                
                .then(response => {
                    
                    alert("Mật khẩu đã được thay đổi! Bạn vui lòng đăng nhập lại vào hệ thống.");
                    localStorage.removeItem("user");
                    window.location.href='/';
                    navigate("/"); 
                })
                .catch(error => {
                    // Error
                   
                       setPassCheck(error.response.data.message)
                     
                });

        }
    }, [formErr]);
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // checkValue();
    //      setFormErr(validate(formValues));
    //     // console.log("formerr",formErr)
    //     if(Object.keys(formErr).length === 0){
    //         axios.patch("http://localhost:3001/user/update/password",{
    //         oldPassword: formValues.oldPassword,
    //         newPassword: formValues.newPassword
            
    //         },{ headers: authHeader() })
            
    //         .then(response => {
    //             setPassCheck(response.data.message);
    //             // alert("Success insert!");
    //         })
    //         .catch(error => {
    //             // Error
               
    //                setPassCheck(error.response.data.message)
                 
    //         });
    //     }
    //     // else{
    //     //     console.log("form",formErr)
    //     // }
        
       
        
            
    // }

    return (
        
            <Modal {...props} centered >
                <Form className={styles.contentedit}>
                <div className={styles.titleEditPf}>
                    <h5 className={styles.titleNameEditPf}>Nhập thông tin để tiến hành đổi mật khẩu </h5>
                    </div>
                    <div><p style={{color:"red"}}>{passCheck}</p></div>
                    <Form.Group className="mb-3" >
                        <Form.Label>Mật khẩu cũ</Form.Label>
                        <Form.Control type="password"   id="oldPass" placeholder="nhập mật khẩu cũ" 
                            name="oldPassword" value={formValues.oldPassword}
                            onChange={handleChange}  />
                    </Form.Group>

                    
                    <Form.Group className="mb-3" >
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <Form.Control type="password"  id="newPass" placeholder="nhập mật khẩu mới" 
                            name="newPassword" value={formValues.newPassword}
                            onChange={handleChange}  />
                    </Form.Group>
                    <p className="err">{formErr.newPassword}</p>

                    <Form.Group className="mb-3" id="formBasicPassword">
                        <Form.Label>Nhập lại mật khẩu mới</Form.Label> 
                        <Form.Control type="password"  id="confirmPass" placeholder="Confirm password" name="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                // onBlur={()=> checkPassConfirm()}
                            />
                            <p className="err">{formErr.confirmPassword}</p>
                        </Form.Group>
                        {/* <p>{formValues.newPassword !== formValues.confirmPassword ? "Mật khẩu không trùng khớp!" : ""}</p> */}

                    
                    <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                </Form>
                </Modal>
            
    )

      
    

}

function HandellChangePassword() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <p  onClick={() => setModalShow(true)} >
                Thay đổi mật khẩu
            </p>

            <ChangePassword
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default HandellChangePassword;
// export default ChangePassword;