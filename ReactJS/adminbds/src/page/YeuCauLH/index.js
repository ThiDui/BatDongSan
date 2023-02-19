import React, { useState, useEffect } from 'react';
import authHeader from '~/Services/authHeader';
import { Form, FormControl,Table } from 'react-bootstrap';
import styles from '../TinBDS/tinbds.module.css'
import axios from 'axios';
import {Link } from 'react-router-dom';
function YeuCauLH() {
    const [yeuCauLh, setYeuCauLh] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/yeucaulienhe')
            .then(response => {
                setYeuCauLh(response.data)

            })
            .catch(err => {
                alert(err.data.message)
            })
    }, [])

    console.log("YeuCau", yeuCauLh)
    return (
        <div className={styles.box}>
            <div className={styles.contentTin}>
                <h4>DANH SÁCH YÊU CẦU LIÊN HỆ CỦA KHÁCH HÀNG</h4>
                <div className={styles.btnAdd}>
                    <div className={styles.btnSearch} >
                        <Form.Group>
                            <FormControl className="w-50" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                    </div>
                    
                </div>
                <Table className="table-sm" bordered >
                    <thead className={styles.tablecolor}>
                        <tr >
                            <th>STT</th>
                            <th>Mã</th>
                            <th>Bất động sản</th>
                            <th>Tài khoản</th>
                            <th>Nội dung</th>
                            <th>Ngày yêu cầu</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            yeuCauLh.filter((item)=>{
                                return search.toLowerCase()===''? item : item.TinBatDongSan.BDS_Ten.toLowerCase().includes(search)
                            }).map((lienheyc, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{lienheyc.TinBDS_Ma}</td>
                                    <td><Link  to={`/batdongsan/detail/${lienheyc.TinBatDongSan.BDS_Ma}`}>{lienheyc.TinBatDongSan.BDS_Ten.toUpperCase()}</Link></td>
                                    <td>{lienheyc.User.username}</td>
                                    
                                    <td>{lienheyc.YC_NoiDung}</td>
                                    <td>{lienheyc.createdAt.toLocaleString() + ''}</td>
                                
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
        // <div className={styles.productsTinUser}>
        //     <Row>
        //         <Col className="col2" md={3} fixed="left">
        //             <NavLeft />

        //         </Col>
        //         <Col className="col2" md={9}>
        //             {
        //                 yeuCauLh.map((data,index) =>(
        //                     <div key ={index} className={styles.lh}>
                        
        //             <Card style={{border: "none"}} className={styles.boxItem} >
        //                 <Row  >

        //                     <Col className={styles.Item1} md={4}>
        //                         {/* {`http://localhost:3001/${data.TinBatDongSan.HinhBDs[0].HA_DuongDan}`} */}
        //                         <Card.Img variant="top"  src= "https://wallpaperaccess.com/full/3060243.jpg" className={styles.img} /></Col>
        //                     <Col className={styles.Item} md={8}>
        //                         <Card.Body>
        //                             <Card.Title>{data.TinBatDongSan.BDS_Ten}</Card.Title>
        //                             <Card.Text><i className="fas fa-map-marker-alt fa-lg" style={{color:"red"}}></i> {data.TinBatDongSan.BDS_DiaChiCuThe}</Card.Text>
        //                         </Card.Body>
        //                         <div className={styles.boxFooter}>
        //                         <span className={styles.bntFt}><Button variant='success' onClick={() => setOpen(!open)}>Xem nội dung yêu cầu</Button></span>
                                
        //                         <span ><Link to={`/batdongsan/${data.TinBDS_Ma}`} ><Button variant="secondary">Xem chi tiết</Button></Link></span>
        //                         </div>
        //                         <Collapse in={open}>
        //                             <div id="example-collapse-text" className={styles.collap}>
        //                             {data.YC_NoiDung}
                                    
        //                             </div>
        //                         </Collapse>

        //                     </Col>

        //                 </Row>
        //             </Card>
        //             </div>
        //                 ))
                    
        //         }
        //         </Col>
        //     </Row>

        // </div>

    )
}

export default YeuCauLH;