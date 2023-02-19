// import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import styles from './Tinbds.module.css';
import format from '~/Services/formatDateTime';
import PriceFormat from '~/Services/priceFormat';
function Tinbds() {
    const {id} = useParams();
    // console.log(id)
    //  const [search, setSearch] = useState(id);
  
    const [tinbds, setTinbds] = useState([]);
    
  useEffect(() => {
    
    Axios.get("http://localhost:3001/batdongsan")

        .then((response) => {

            setTinbds(response.data);
        })

}, [])

console.log("tin",tinbds)
// console.log(id.id)
// new Date().toLocaleString() + ''

    return (
      
       
            <div className={styles.productsview}>
                <h2>Bất động sản tại {id}</h2>
                <div className={styles.bdscontent}>
            {
            (tinbds.length !=0) ?
           
            tinbds.filter((item)=>{
                return (item.BDS_DiaChiCuThe.toLowerCase().includes(id.toLowerCase()));
                //return id.toLowerCase()===''?  console.log("item",item) : item.BDS_DiaChiCuThe.toLowerCase().includes(id);
                
            }).map(a => (
                        <div className={styles.boxFlex} key={a.BDS_Ma}  >
                            
                            <Card className={styles.bdsbox} >
                                <div  className={styles.bdsimg}>
                                <Card.Img  style={{height: "200px"}} variant="top" src={`http://localhost:3001/${a.HinhBDs[0].HA_DuongDan}`} />
                                <span className={styles.lb}>{a.LoaiGiaoDich.LGD_Ten}</span>
                                </div>
                                <Card.Body>
                                    <Card.Title>{a.BDS_Ten}</Card.Title>
                                    <Card.Text>
                                        <div className={styles.gia}>
                                            <span style={{color:"red"}}>{ PriceFormat(a.BDS_Gia)}</span>
                                            <span style={{color:"red"}}> ({a.LoaiTienTe.LTT_Ten})</span></div>
                                        <div><i className="fas fa-map-marker-alt fa-lg map" style={{color:"red"}}></i> {a.BDS_DiaChiCuThe}</div>
                                        {/* <span className='p-2'><i className="fas fa-bed fa-lg"></i> Phòng ngủ: {a.BDS_SoPhongNgu}</span>
                                        <span  className='p-2'><i className="fas fa-bath fa-lg"></i> Phòng tắm: {a.BDS_SoPhongTam}</span> */}
                                        {/* <div  className='p-2'><i className="fas fa-arrows-alt fa-lg"></i> Diện tích: {a.BDS_DienTich}</div> */}
                                    </Card.Text>
                                    
                                </Card.Body>
                                <Card.Footer>
                                <span className={styles.nguoidang}>Đăng bởi: {a.User.username} <br/> 
                                    <span><i class="far fa-clock"></i> {format.formatVNDate( a.BDS_NgayDang)}</span>
                                </span>
                                {/* <span className={styles.nguoidang}>Đăng bởi: {a.User.username} </span> */}
                                    <span className= {styles.show}><Link to={`/batdongsan/${a.BDS_Ma}`} >Xem chi tiết <i className="fas fa-chevron-right"></i></Link></span>
                                </Card.Footer>
                            </Card>
                            
                            
                        

                        </div>
                    ))
           
                    : "Khong co ket qua"
            }
            </div>
            
            </div>
        
    );

}



export default Tinbds;