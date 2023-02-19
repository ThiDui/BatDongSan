import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import format from '~/Services/formatDateTime';
import authHeader from '~/Services/authHeader';
import NavLeft from './navLeft';
import styles from './dangtin.module.css';

import { Table,Form,FormControl,Col,Row } from 'react-bootstrap';

function TinHetHan() {
    const [tinbds, setTinBDS] = useState([]);
    const [search, setSearch] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        loadTinBDS();
    }, []);

    const loadTinBDS = async () => {
        const result = await axios.get('http://localhost:3001/batdongsan/user/tinhethan',{ headers: authHeader() });
        setTinBDS(result.data);

    }

    // const handleDelete=  (id)=>{
    //     let text = "Bạn có chắc chắn muốn xóa bài đăng này!";
    //     if(user.roles[0] != "ROLE_ADMIN"){
    //         alert("Bạn không có đủ quyền thực hiện chức năng này!")
    //     }
    //      else
    //     if (window.confirm(text) == true) {
    //          axios.delete(`http://localhost:3001/batdongsan/${id}`)
    //          window.location.href="/batdongsan";
    //     } 
       
    //   }
    

    return (

        <div className={styles.productsTinUser}>
             <Row>
                <Col className="col2" md={3} fixed="left">
                    <NavLeft />
                    
                </Col>
                <Col className="col2" md={9}>
                <h2>Danh sách tin hết hạn</h2>
                <div className={styles.btnAdd}>
                    <div className={styles.btnSearch} >
                        <Form.Group>
                            <FormControl className="w-50" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                    </div>
                    {/* <div>
                        <Link className="btn btn-info" style={{ color: "white" }} to="/batdongsan/add"><AddOutlinedIcon />Thêm mới</Link>
                    </div> */}
                </div>
                <Table className="table-sm" bordered >
                    <thead className={styles.tablecolor}>
                        <tr >
                            <th>STT</th>
                            <th>Giao dịch</th>
                            <th>Loại</th>
                            <th>Tên bất động sản</th>
                            {/* <th>Chủ sở hữu</th> */}
                            <th>Ngày đăng</th>
                            <th>Ngày hết hạn</th>
                            <th>Trạng thái</th>
                            <th>Nhân viên</th>
                            {/* <th colSpan={2}>Option</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tinbds.filter((item)=>{
                                return search.toLowerCase()===''? item : item.BDS_Ten.toLowerCase().includes(search)
                            }).map((tinbds, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{tinbds.LoaiGiaoDich.LGD_Ten}</td>
                                    <td>{tinbds.LoaiBD.L_Ten}</td>
                                    <td>{tinbds.BDS_Ten.toUpperCase()}</td>
                                    {/* <td>{tinbds.LienHe.LH_TenChuSoHuu}</td> new Date().toLocaleString() + '' */}
                                    <td>{format.formatVNDate( tinbds.BDS_NgayDang) +" "+ format.formatTime( tinbds.BDS_NgayDang)}</td>
                                    <td>{format.formatVNDate( tinbds.BDS_NgayHetHan) +" "+ format.formatTime( tinbds.BDS_NgayHetHan)}</td>
                                    <td className='pt-3' ><span className={styles.btn}>{tinbds.BDS_TrangThai}</span></td>
                                    <td>{tinbds.User.username}</td>
                                    {/* <td><Link className="btn" to={`/batdongsan/detail/${tinbds.BDS_Ma}`}><RemoveRedEyeIcon style={{ color: "#3a98b8" }} fontSize='small' /></Link></td>
                                    <td><Link className="btn" to={`/batdongsan/edit/${tinbds.BDS_Ma}`}><BorderColorOutlinedIcon style={{ color: "#3a98b8" }} fontSize='small' /></Link></td>
                                    <td  onClick={()=> handleDelete(tinbds.BDS_Ma)}>
                                        <DeleteForeverIcon style={{ color: "red" }}  />
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
            </Row>
            
        </div>


    )

}

export default TinHetHan;