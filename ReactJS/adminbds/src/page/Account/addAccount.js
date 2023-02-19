import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import styles from './signup.module.css'
function Signup(props) {
    const initialValues = { username: "", email: "", password: "", confirmPassword: "", phone: "", address: "",RoleId : 2, RoleQTCMa:2,ChucVuMaChucvu:3}
    
    const [avatar, setAvatar] = useState("");
    const [formValues, setFormValue] = useState(initialValues);
    const [formErr, setFormErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [mess, setMess] =useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
        // console.log(formValues)
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErr(validate(formValues));
        setIsSubmit(true);
    }
    useEffect(() => {
        if (Object.keys(formErr).length === 0 && isSubmit) {
            let formData = new FormData()
                formData.append('username',formValues.username)
                formData.append('password',formValues.password)
                formData.append('avatar',avatar)
                formData.append('phone',formValues.phone)
                formData.append('email',formValues.email)
                formData.append('address',formValues.address)
                formData.append('RoleId',formValues.RoleId)
                formData.append('RoleQTCMa',formValues.RoleQTCMa)
                formData.append('ChucVuMaChucvu',formValues.ChucVuMaChucvu)
                

            Axios.post("http://localhost:3001/auth/signuptest",formData , {
            
                headers: {
                     "Content-Type": "multipart/form-data",
                     
                }}
            )
                .then((response) => {
                    alert(response.data.message)
                    window.location.href="/accountAd"
                })
                .catch(err =>{
                    setMess(err.response.data.message)
                })

        }
    }, [formErr]);

    const validate = (values) => {
        const errors = {};
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        let mktam = /^(?=.*\d)(?=.*[A-Za-z])(?!.*[!@#$%^&*()_+].{5,16$})/;
        if(!values.username || !values.password || !values.email || !values.phone|| !values.address){
            errors.all="Bạn phải nhập đầy đủ thông tin !"
            alert("Bạn phải nhập đầy đủ thông tin !")
        }else {
        // if (!values.username) {
        //     errors.username = "Username is required!";
        // }
        // if (!values.password) {
        //     errors.password = "Password is required!";
        // }
        if (!mktam.test(values.password)) {
            errors.password = "Mật khẩu phải từ 5 đến 16 kí tự, gồm chữ và số!"
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required!";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password are not matching, please try again!";
        }
        // if (!values.email) {
        //     errors.email = "Email is required!";
        // } else
         if (!regexEmail.test(values.email)) {
            errors.email = "This is not a valid email format!"
        }
        if (!values.phone) {
            errors.phone = " Number phone is required!";
        }
        if (!values.address) {
            errors.address = "Address is required!";
        }
    }
        return errors;
    }
  
    return (

        <div>
           
            <Modal {...props} centered >
                <div className={styles.AddAccountForm}>

                   
                    <Form className={styles.formSigup}> 
                        <h3 className="mb-3">Signup</h3>
                        <h6 style={{color:"red"}}>{mess ? <span><i class="far fa-times-circle"></i> {mess} </span> : ""}</h6>
                        <Form.Group className="mb-3" controlId="username">
                        {/* <Form.Label className={styles.label}>Loại giao dịch <span className={styles.ic}>*</span> */}
                            <Form.Label>Username <span style={{color:"red"}}>*</span></Form.Label>
                            <Form.Control type="username" placeholder="Username" name="username"
                                value={formValues.username}
                                onChange={handleChange} />
                        </Form.Group>
                        <p className="err">{formErr.username}</p>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password <span style={{color:"red"}}>*</span></Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password"
                                value={formValues.password}
                                onChange={handleChange} />
                        </Form.Group>
                        <p className="err">{formErr.password}</p>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm password <span style={{color:"red"}}>*</span></Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" name="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <p className="err">{formErr.confirmPassword}</p>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address <span style={{color:"red"}}>*</span></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email"
                                value={formValues.email}
                                onChange={handleChange} />
                        </Form.Group>
                        <p className="err">{formErr.email}</p>

                        <Form.Group className="mb-3" controlId="numberphone">
                            <Form.Label>Number phone <span style={{color:"red"}}>*</span></Form.Label>
                            <Form.Control type="phone" placeholder="Number phone" name="phone"
                                value={formValues.phone}
                                onChange={handleChange} />
                        </Form.Group>
                        <p className="err">{formErr.phone}</p>

                        <Form.Group className="mb-3" >
                            
                            <Form.Control type="file"  onChange={(e) => setAvatar(e.target.files[0])} />
                        </Form.Group>
                    {/* <Form.Group  className="mb-3">
                            <Form.Label>Small file input example</Form.Label>
                            <Form.Control className="custom-file" type="file" size="sm" />
                        </Form.Group> */}

                        <Form.Group className="mb-3" controlId="address">
                            {/* <Form.Label>Address</Form.Label> */}
                            <Form.Control type="address" placeholder="Address" name="address"
                                value={formValues.address}
                                onChange={handleChange} />
                        </Form.Group>
                        <p className="err">{formErr.address}</p>
                        <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>


            </ Modal>
        </div>
    );
}

function Handellsignup() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="dark" onClick={() => setModalShow(true)} className="btn-login">
            Đăng kí
            </Button>

            <Signup
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Handellsignup;
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import '../login/login.css'
// function Signup(props) {
//     const initialValues = { username: "", email: "", password: "", confirmPassword: "", phone: "", address: "" }
//     const [avatar, setAvatar] = useState("");
//     const [formValues, setFormValue] = useState(initialValues);
//     const [formErr, setFormErr] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValue({ ...formValues, [name]: value });
//         // console.log(formValues)
//     }

//     // useEffect(() => {
//     //     return () => {
//     //         //neu co avatar thif se xoa cais trc ra khoi bo nho
//     //         avatar && URL.revokeObjectURL(avatar.preview)

//     //     }
//     // }, [avatar])

//     const handleAvatar = (e) => {
//         const file = e.target.files[0];
//         file.preview = URL.createObjectURL(file);

//         setAvatar(file);
//         console(file);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setFormErr(validate(formValues));
//         setIsSubmit(true);
//     }
//     useEffect(() => {
//         if (Object.keys(formErr).length === 0 && isSubmit) {
//             Axios.post("http://localhost:3001/auth/signup", {
//                 username: formValues.username,
//                 password: formValues.password,
//                 avatar: avatar,
//                 phone: formValues.phone,
//                 email: formValues.email,
//                 address: formValues.address
//             })
//                 .then((response) => {
//                     console.log(response);
//                 })

//         }
//     }, [formErr]);

//     const validate = (values) => {
//         const errors = {};
//         const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//         if (!values.username) {
//             errors.username = "Username is required!";
//         }
//         if (!values.password) {
//             errors.password = "Password is required!";
//         }
//         if (!values.confirmPassword) {
//             errors.confirmPassword = "Confirm password is required!";
//         } else if (values.password !== values.confirmPassword) {
//             errors.confirmPassword = "Password are not matching, please try again!";
//         }
//         if (!values.email) {
//             errors.email = "Email is required!";
//         } else if (!regexEmail.test(values.email)) {
//             errors.email = "This is not a valid email format!"
//         }
//         if (!values.phone) {
//             errors.phone = " Number phone is required!";
//         }
//         if (!values.address) {
//             errors.address = "Address is required!";
//         }
//         return errors;
//     }
  
//     return (

//         <div>
           
//             <Modal {...props} centered >
//                 <div className="loginForm">

                   
//                     <Form>
//                         <h3 className="mb-3">Signup</h3>
//                         <Form.Group className="mb-3" controlId="username">
//                             {/* <Form.Label>Username</Form.Label> */}
//                             <Form.Control type="username" placeholder="Username" name="username"
//                                 value={formValues.username}
//                                 onChange={handleChange} />
//                         </Form.Group>
//                         <p className="err">{formErr.username}</p>

//                         <Form.Group className="mb-3" controlId="password">
//                             {/* <Form.Label>Password</Form.Label> */}
//                             <Form.Control type="password" placeholder="Password" name="password"
//                                 value={formValues.password}
//                                 onChange={handleChange} />
//                         </Form.Group>
//                         <p className="err">{formErr.password}</p>

//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             {/* <Form.Label>Confirm password</Form.Label> */}
//                             <Form.Control type="password" placeholder="Confirm password" name="confirmPassword"
//                                 value={formValues.confirmPassword}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <p className="err">{formErr.confirmPassword}</p>

//                         <Form.Group className="mb-3" controlId="formBasicEmail">
//                             {/* <Form.Label>Email address</Form.Label> */}
//                             <Form.Control type="email" placeholder="Enter email" name="email"
//                                 value={formValues.email}
//                                 onChange={handleChange} />
//                         </Form.Group>
//                         <p className="err">{formErr.email}</p>

//                         <Form.Group className="mb-3" controlId="numberphone">
//                             {/* <Form.Label>Number phone</Form.Label> */}
//                             <Form.Control type="phone" placeholder="Number phone" name="phone"
//                                 value={formValues.phone}
//                                 onChange={handleChange} />
//                         </Form.Group>
//                         <p className="err">{formErr.phone}</p>

//                         {/* <Form.Group className="mb-3" >
                            
//                             <Form.Control type="file" value ={avatar} onChange={handleAvatar} />
//                         </Form.Group> */}
// <Form.Group  className="mb-3">
//         <Form.Label>Small file input example</Form.Label>
//         <Form.Control className="custom-file" type="file" size="sm" />
//       </Form.Group>

//                         <Form.Group className="mb-3" controlId="address">
//                             {/* <Form.Label>Address</Form.Label> */}
//                             <Form.Control type="address" placeholder="Address" name="address"
//                                 value={formValues.address}
//                                 onChange={handleChange} />
//                         </Form.Group>
//                         <p className="err">{formErr.address}</p>
//                         <Button onClick={handleSubmit} variant="primary" className="w-100" type="submit">
//                             Submit
//                         </Button>
//                     </Form>

//                 </div>


//             </ Modal>
//         </div>
//     );
// }

// function Handellsignup() {
//     const [modalShow, setModalShow] = useState(false);

//     return (
//         <>
//             <Button variant="dark" onClick={() => setModalShow(true)} className="btn-login">
//             Đăng kí
//             </Button>

//             <Signup
//                 show={modalShow}
//                 onHide={() => setModalShow(false)}
//             />
//         </>
//     );
// }

// export default Handellsignup;