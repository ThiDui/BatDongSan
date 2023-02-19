// import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import PriceFormat from '~/Services/priceFormat';
import styles from './Tinbds.module.css';
import format from '~/Services/formatDateTime';
function LimitBan({data}) {
   

    // const formatter = new Intl.NumberFormat( {
    //     style: 'currency',
    //     currency: 'VND',
    //   });
// new Date().toLocaleString() + ''

    return (
       
            <div className={styles.limitBan}>
                <h2 className={styles.h2LimitBan}>Bất động sản Bán</h2>
                <div className={styles.bdscontent}>
            {
                (data) ?
            
                data.filter((item)=>{
                   // return item.LoaiGiaoDichLGDMa.toLowerCase().includes(id.toLowerCase());
                    return item.LoaiGiaoDichLGDMa=== 1;
                    
                })
                .slice(0, 8).map(a => (
                    <div className={styles.boxFlex} key={a.BDS_Ma}  >
                        <Card className={styles.bdsbox} >
                            <div  className={styles.bdsimg}>
                            <Card.Img style={{height: "200px"}} variant="top" src={`http://localhost:3001/${a.HinhBDs[0].HA_DuongDan}`} />
                            <span className={styles.lb}>{a.LoaiGiaoDich.LGD_Ten}</span>
                            </div>
                            <Card.Body>
                                <Card.Title className={styles.TenBds}>{a.BDS_Ten}</Card.Title>
                                <Card.Text>
                                    <div className={styles.gia}><span>{ PriceFormat(a.BDS_Gia)}</span>
                                    <span style={{color:"red"}}> ({a.LoaiTienTe.LTT_Ten})</span></div>
                                    <div><i className="fas fa-map-marker-alt fa-lg map" style={{color:"red"}}></i> {a.BDS_DiaChiCuThe}</div>
                                    {/* <div className='p-2'><i className="fas fa-bed fa-lg"></i> Phòng ngủ: {a.BDS_SoPhongNgu}</div>
                                    <div  className='p-2'><i className="fas fa-bath fa-lg"></i> Phòng tắm: {a.BDS_SoPhongTam}</div>
                                    <div  className='p-2'><i className="fas fa-arrows-alt fa-lg"></i> Diện tích: {a.BDS_DienTich}</div> */}
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
                    : " "
            }
            </div>
            
            </div>
        
    );

}



export default LimitBan;