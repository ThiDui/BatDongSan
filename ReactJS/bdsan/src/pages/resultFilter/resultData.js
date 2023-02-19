// import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import format from '~/Services/formatDateTime';
import {useLocation} from 'react-router-dom';
import PriceFormat from '~/Services/priceFormat';
import styles from './Tinbds.module.css';


function Tinbds() {
    const location = useLocation();
    // console.log(location.state.newData);

    return (
     
       
            <div className={styles.productsview}>
                 {/* <h1>result</h1> */}
                <h2>Bất động sản </h2>
                <div className={styles.bdscontent}>
            {
            
           
            location.state.newData.map(a => (
                        <div className={styles.boxFlex} key={a.BDS_Ma}  >
                            
                            <Card className={styles.bdsbox} >
                                <div  className={styles.bdsimg}>
                                <Card.Img style={{height: "200px"}} variant="top"  src={`http://localhost:3001/${a.HinhBDs[0].HA_DuongDan}`} />
                                <span className={styles.lb}>{a.LoaiGiaoDich.LGD_Ten}</span>
                                </div>
                                <Card.Body>
                                    <Card.Title>{a.BDS_Ten}</Card.Title>
                                    <Card.Text>
                                        <div className={styles.gia}>
                                            <span style={{color:"red"}}>{ PriceFormat(a.BDS_Gia)}</span>
                                            <span style={{color:"red"}}> ({a.LoaiTienTe.LTT_Ten})</span>
                                        </div>
                                        <div><i className="fas fa-map-marker-alt fa-lg map" style={{color:"red"}}></i> {a.BDS_DiaChiCuThe}</div>
                                        {/* <span className='p-2'><i className="fas fa-bed fa-lg"></i> Phòng ngủ: {a.BDS_SoPhongNgu}</span>
                                        <span  className='p-2'><i className="fas fa-bath fa-lg"></i> Phòng tắm: {a.BDS_SoPhongTam}</span> */}
                                        
                                    </Card.Text>
                                    
                                </Card.Body>
                                <Card.Footer>
                                <span className={styles.nguoidang}>Đăng bởi: {a.User.username} <br/> 
                                    <span><i class="far fa-clock"></i> {format.formatVNDate( a.BDS_NgayDang)}</span>
                                </span>
                                    <span className= {styles.show}><Link to={`/batdongsan/${a.BDS_Ma}`} >Xem chi tiết <i className="fas fa-chevron-right"></i></Link></span>
                                </Card.Footer>
                            </Card>
                            
                            
                        

                        </div>
                    ))
           
                    
            }
            </div>
            
            </div>
        
    );

}



export default Tinbds;