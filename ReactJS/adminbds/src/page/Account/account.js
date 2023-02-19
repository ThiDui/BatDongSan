import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
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
        <div className='avatarTT'>
        {
            profile.map((data) => (
                <div key={data.id} className={styles.boxTaiKhoan}>
                    {/* {console.log(data.avatar)} */}
                     <Dropdown align="end">
                                    <Dropdown.Toggle  variant="none"  className="colorToggle" >
                                    {
                                        (!data.avatar) ? <PersonIcon />
                                        :
                                    
                                    <img src={`http://localhost:3001/${data.avatar}`} alt="Avatar" className={styles.avatar} />
                                    }
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item ><span><img src={`http://localhost:3001/${data.avatar}`} alt="Avatar" className={styles.avatar} /></span>
                                        <span>{data.username}</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item ><Link to="/profile" >Trang cá nhân</Link></Dropdown.Item>
                                    <Dropdown.Item ><Link to="/logout" >Logout</Link></Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                </div>
            ))
        }


{/* <div className='avatarTT'>
              
                <Dropdown align="end">
                <Dropdown.Toggle className="colorToggle"  variant="none"><img src="https://toigingiuvedep.vn/wp-content/uploads/2021/06/anh-chat-ngau-nu.jpg" alt="Avatar" className="avatar" /></Dropdown.Toggle>
                    
                  <Dropdown.Menu>
                  <Dropdown.Item ><span><img src="https://toigingiuvedep.vn/wp-content/uploads/2021/06/anh-chat-ngau-nu.jpg" alt="Avatar" className="avatar" /></span>
                    <span>Ha Sa</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                    <Dropdown.Item ><Link to="/profile" >Trang cá nhân</Link></Dropdown.Item>
                    <Dropdown.Item ><Link to="/logout" >Logout</Link></Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item >Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div> */}

    </div>
    )
}

export default Account;
