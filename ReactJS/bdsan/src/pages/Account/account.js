import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import styles from "./account.module.css";
import axios from 'axios';
import { Dropdown} from 'react-bootstrap';
import authHeader from "~/Services/authHeader";


function Account() {
    const [profile, setProfile] = useState([]);
   
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
                    {/* {console.log(data.avatar)} */}
                     <Dropdown className="dropdownTK" bg="dark" variant="dark" align="end">
                                    <Dropdown.Toggle  variant="none"  className="toggleTK" style={{color:"white"}}>
                                    {
                                        (!data.avatar) ? <i className="far fa-user-circle fa-2x"></i>
                                        :
                                    
                                    <img src={`http://localhost:3001/${data.avatar}`} alt="Avatar" className={styles.avatar} />
                                    }
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item >
                                         <Link  to="/logout">
                                             <i className="fas fa-sign-out-alt">Sign Out</i>
                                         </Link></Dropdown.Item>
                                        <Dropdown.Item ><Link to ="/Profile">Thông tin cá nhân</Link></Dropdown.Item>
                                        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                                    </Dropdown.Menu>
                                    </Dropdown>
                </div>
            ))
        }


    </div>
    )
}

export default Account;
