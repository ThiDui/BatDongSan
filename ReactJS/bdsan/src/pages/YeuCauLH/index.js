import React, { useState, useEffect } from 'react';
import { Row, Col,Card,Button,Collapse } from 'react-bootstrap';
import authHeader from '~/Services/authHeader';
import NavLeft from '../DangTin/navLeft';
import styles from './yeucaulh.module.css'
import axios from 'axios';
import {Link } from 'react-router-dom';
function YeuCauLH() {
    const [yeuCauLh, setYeuCauLh] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/yeucaulienhe/user', { headers: authHeader() })
            .then(response => {
                setYeuCauLh(response.data)

            })
            .catch(err => {
                alert(err.data.message)
            })
    }, [])
// console.log(yeuCauLh)
    return (
        <div className={styles.productsTinUser}>
            <Row>
                <Col className="col2" md={3} fixed="left">
                    <NavLeft />

                </Col>
                <Col className="col2" md={9}>
                    {
                        yeuCauLh.map((data,index) =>(
                            <div key ={index} className={styles.lh}>
                        
                    <Card style={{border: "none"}} className={styles.boxItem} >
                        <Row  >

                            <Col className={styles.Item1} md={4}>
                                {/* {`http://localhost:3001/${data.TinBatDongSan.HinhBDs[0].HA_DuongDan}`} */}
                                <Card.Img variant="top"  src={`http://localhost:3001/${data.TinBatDongSan.HinhBDs[0].HA_DuongDan}`} className={styles.img} /></Col>
                            <Col className={styles.Item} md={8}>
                                <Card.Body>
                                    <Card.Title>{data.TinBatDongSan.BDS_Ten}</Card.Title>
                                    <Card.Text><i className="fas fa-map-marker-alt fa-lg" style={{color:"red"}}></i> {data.TinBatDongSan.BDS_DiaChiCuThe}</Card.Text>
                                </Card.Body>
                                <div className={styles.boxFooter}>
                                <span className={styles.bntFt}><Button variant='success' onClick={() => setOpen(!open)}>Xem nội dung yêu cầu</Button></span>
                                
                                <span ><Link to={`/batdongsan/${data.TinBDS_Ma}`} ><Button variant="secondary">Xem chi tiết</Button></Link></span>
                                </div>
                                <Collapse in={open}>
                                    <div id="example-collapse-text" className={styles.collap}>
                                    {data.YC_NoiDung}
                                    
                                    </div>
                                </Collapse>

                            </Col>

                        </Row>
                    </Card>
                    </div>
                        ))
                    
                }
                </Col>
            </Row>

        </div>

    )
}

export default YeuCauLH;