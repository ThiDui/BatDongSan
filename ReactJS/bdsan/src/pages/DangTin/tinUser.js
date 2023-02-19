import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import authHeader from '~/Services/authHeader';
import {Table }from 'react-bootstrap';
import styles from './dangtin.module.css';
import NavLeft from "./navLeft";
import format from '~/Services/formatDateTime';
import { Form, FormControl ,Row, Col,} from 'react-bootstrap';

function TinBDS() {
    
    const [tinbds, setTinBDS] = useState([]);
    
    

    useEffect(() => {
        loadTinBDS();
    }, []);

    const loadTinBDS = async () => {
        const result = await axios.get('http://localhost:3001/batdongsan/user/approved',{ headers: authHeader() });
        setTinBDS(result.data);

    }

   

    const handleDelete=  (id)=>{
        let text = "Bạn có chắc chắn muốn xóa bài đăng này!";
        if (window.confirm(text) == true) {
             axios.delete(`http://localhost:3001/batdongsan/${id}`)
            window.location.href="/batdongsan/user";
        } 
       
      }

    // const Delete= async (id)=>{
    //     await axios.delete(`http://localhost:3001/tinbds/${id}`)
    //     loadTinBDS();
    // }


    return (

        <div className={styles.productsTinUser}>
             <Row>
                <Col className="col2" md={3} fixed="left">
                    <NavLeft />
                    
                </Col>
                <Col className="col2" md={9}>
                  
            <div className={styles.contentTinUser}>
                <h2>DANH SÁCH </h2>
                
                <Table className="table-sm" bordered >
                    <thead className={styles.tablecolor}>
                        <tr >
                            <th>STT</th>
                            <th>Giao dịch</th>
                            <th>Loại</th>
                            <th>Tên bất động sản</th>
                            <th>Chủ sở hữu</th>
                            <th>Ngày đăng</th>
                            <th>Ngày hết hạn</th>
                            <th>Trạng thái</th>
                            
                            {/* <th colSpan={2}>Option</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        { (tinbds !="") ?
                            tinbds.map((tinbds, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{tinbds.LoaiGiaoDich.LGD_Ten}</td>
                                    <td>{tinbds.LoaiBD.L_Ten}</td>
                                    <td>{tinbds.BDS_Ten.toUpperCase()}</td>
                                    <td>{tinbds.LienHe.LH_TenChuSoHuu}</td>
                                    <td>{format.formatVNDate( tinbds.BDS_NgayDang) +" "+ format.formatTime( tinbds.BDS_NgayDang)}</td>
                                    <td>{format.formatVNDate( tinbds.BDS_NgayHetHan)}</td>
                                    <td className='pt-2' ><span className={styles.btn}>{tinbds.BDS_TrangThai}</span></td>

                                    {/* <td className={styles.editIcon}  > <Link className="btn" to={`/batdongsan/edit/${tinbds.BDS_Ma}`}><i className="far fa-edit"></i></Link></td>
                                    <td className={styles.delIcon} onClick={()=>{handleDelete(tinbds.BDS_Ma)}}><i className="far fa-trash-alt"></i></td> */}
                                    
                                </tr>
                            ))

                            : <h4>Bạn chưa có đăng tin nào !</h4>
                        }

    {/* onClick={()=>{handleDelete(tinbds.BDS_Ma)}} */}
                    </tbody>
                </Table>
            </div>
            </Col>
              </Row>
        </div>


    )

}

export default TinBDS;