import React from "react";
import {Link } from 'react-router-dom';
import ChangePassword from './changePass';
import EditProfile from './EditProfile';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import authHeader from "~/Services/authHeader";
import { Container } from "react-bootstrap";

function Profile() {
    
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);
   
 
        
        useEffect(() => {
        
            loadUser();
        }, []);
    
    
        const loadUser = async () => {
            try{
            setLoading(true);
            const result = await axios.get("http://localhost:3001/user/profile",{ headers: authHeader() });
            setProfile(result.data);
            setLoading(false);
            }
            catch (err) {
                console.log(err);
                
              }
            
        };



    return (
        <div className={styles.box}>
            <Container>
         {
            (!loading) ?
            profile.map((data) =>(
                    
               
            <div key={data.id} className={styles.content}>
            <div className="row">
                <div className="col-sm-8 " >
                    <div className={styles.boxItem}>
                        <h4 className={styles.title}>Thông tin cá nhân</h4>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                <div>Ảnh</div>
                                <div>Thêm ảnh để cá nhân hóa tài khoản của bạn</div>
                                <div><img src={`http://localhost:3001/${data.avatar}`} alt="Avatar" className={styles.avatar} /></div>
                            </ListGroup.Item >
                            <ListGroup.Item className={styles.item}>
                                <div className={styles.itemTitle}>Tên tài khoản</div>
                                <div className={styles.itemContent}>{data.username}</div>
                            </ListGroup.Item>
                           
                           
                        </ListGroup>
                    </div><br />


                    <div className={styles.boxItem}>
                        <h4 className={styles.title}>Thông tin liên hệ</h4>
                        <ListGroup variant="flush">
                            <ListGroup.Item className={styles.item}>
                                <div className={styles.itemTitle}>Email</div>
                                <div className={styles.itemContent}>{data.email}</div>
                            </ListGroup.Item>
                            <ListGroup.Item className={styles.item}>
                                <div className={styles.itemTitle}>Số điện thoại</div>
                                <div className={styles.itemContent}>{"+84 "+ data.phone }</div>

                            </ListGroup.Item>
                            <ListGroup.Item className={styles.item}> 
                                <div className={styles.itemTitle}>Địa chỉ</div>
                                <div className={styles.itemContent}>{data.address}</div>
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </div>
                </div>

                <div className="col-sm-4 " >
                    <div>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active>
                                Quản lý tài khoản cá nhân
                            </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <EditProfile dataemail={ data.email} dataphone={ data.phone} dataaddress={data.address}   />
                         </ListGroup.Item>
                            <ListGroup.Item as="li">
                                <ChangePassword/>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>   
            </div>
            </div>

            ))

                            
            : "Loading..."
            } 
            </Container>
        </div>
    )

}

export default Profile;