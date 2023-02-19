import React from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './err.module.css';
function ThongBao(){
    return(
        <div className={styles.box}>
            <div className={styles.boxTB}>
            <h4> <span style={{color:"red"}}><ClearIcon/></span> Bạn không có quyền truy cập</h4>
            <p>Tài khoản của bạn không có đủ quyền để sử dụng tính năng này.</p>

            <Link to="/"><Button  variant="primary">Trở về trang chủ</Button></Link>
            </div>
        </div>
        
        )

}

export default ThongBao;