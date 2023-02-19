import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import styles from "./dangtin.module.css";
import axios from 'axios';
import { ListGroup ,Collapse} from 'react-bootstrap';
import authHeader from "~/Services/authHeader";

function NavLeft() {
    const [profile, setProfile] = useState([]);
    const [open, setOpen] = useState(false);
    // const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {

        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get('http://localhost:3001/user/profile',{ headers: authHeader() });
            setProfile(result.data);
        }
        catch (err) {
            console.log(err);

        }

    };

    return (
        <div className={styles.menuDangTin}>
        {
            profile.map((data) => (
                <div key={data.id} className={styles.boxTaiKhoan}>
                     <div className={styles.profile}>
                        <div className={styles.profileImg}><img src={`http://localhost:3001/${data.avatar}`} alt="Avatar" className={styles.avatar} /></div>
                        <div className={styles.profileInf}>
                            <h4>{data.username}</h4>
                            <p>Số bài đăng</p>
                        </div>
                        
                     </div>
                   
                    <div className={styles.boxItem}>
                        <h5 className={styles.title}>Thông tin tài khoản</h5>

                        <div className={styles.item}>
                            <div className={styles.itemTitle}><i class="far fa-envelope"></i></div>
                            <div className={styles.itemContent}>{data.email}</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><i class="fas fa-phone"></i></div>
                            <div className={styles.itemContent}>{"+84 " + data.phone}</div>

                        </div>
                        <div className={styles.item}>
                            <div className={styles.itemTitle}><i class="fas fa-address-card"></i></div>
                            <div className={styles.itemContent}>{data.address}</div>
                        </div>


                    </div><br/>
                </div>
            ))
        }
{/* ><Link to="/batdongsan/user" */}

        <ListGroup variant="flush">
            <ListGroup.Item  onClick={() => setOpen(!open)}
             aria-controls="example-collapse-text" className={styles.itemGroup}
             aria-expanded={open}><i class="far fa-list-alt"></i> &emsp; Quản lý đăng tin </ListGroup.Item>

            {/* <Collapse in={open}> */}
                <div id="example-collapse-text">
                <ListGroup variant="flush">
                <ListGroup.Item  className={styles.listItem}><a style={{color:"black"}} href="http://localhost:3000/batdongsan/dangtin">Đăng tin</a></ListGroup.Item>
                <ListGroup.Item  className={styles.listItem}><Link style={{color:"black"}} to="/batdongsan/user/notapproved">Tin chờ duyệt</Link></ListGroup.Item>
                <ListGroup.Item  className={styles.listItem} ><Link style={{color:"black"}} to="/batdongsan/user">Tin đã đăng</Link></ListGroup.Item>
                <ListGroup.Item  className={styles.listItem} ><Link style={{color:"black"}} to="/batdongsan/user/hethan">Tin hết hạn</Link></ListGroup.Item>
                </ListGroup>
                </div>
            {/* </Collapse> */}
            
            <ListGroup.Item className={styles.itemGroup}><i class="far fa-list-alt"></i> &emsp; Tin bạn đã quan tâm </ListGroup.Item>
            <div id="example-collapse-text">
                <ListGroup variant="flush">
                <ListGroup.Item  className={styles.listItem}><Link style={{color:"black"}} to="/yeucaulienhe/user">Tin yêu cầu liên hệ</Link></ListGroup.Item>
                
                </ListGroup>
                </div>

        </ListGroup>

    </div>
    )
}

export default NavLeft;
