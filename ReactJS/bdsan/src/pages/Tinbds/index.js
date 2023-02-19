// import { Container, Row, Col } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {Link } from 'react-router-dom';
import {Card,Row,Col,Form,Button} from 'react-bootstrap';
import PriceFormat from '~/Services/priceFormat';
import Filter from './filter';
import styles from './Tinbds.module.css';
import axios from 'axios';
import format from '~/Services/formatDateTime';
function Tinbds() {
    const id = useParams([]);
   
    const [tinbds, setTinbds] = useState([]);
    const [maxPrice,setMaxPrice] = useState('');
    const [minPrice,setMinPrice] = useState('');
    const [maxDienTich,setMaxDienTich] = useState('');
    const [minDienTich,setMinDienTich] = useState('');

// dia chi
    const [tinhthanh, setTinhthanh] = useState([]);
    const [quanhuyen, setQuanhuyen] = useState([]);
    const [xaphuong, setXaphuong] = useState([]);
    const [tenTt, setTenTt] = useState("");
    const [tenQh, setTenQh] = useState("");
    const [tenXp, setTenXp] = useState("");
    const [diachi, setDiaChi] = useState("");

    
    // useEffect(() => {
    //     if(tenTt || tenQh){
    //         setDiaChi(tenTt +"," + tenQh + "," + tenXp)
    //     }
       
    // })

   const AdressFilter=() => {
    if (tenTt || tenQh) {
        setDiaChi(tenTt + "," + tenQh + "," + tenXp)
      }
  
      if (tenTt) {
        setDiaChi(tenTt)
  
      }
      if (tenTt && tenQh) {
        setDiaChi(tenTt + "," + tenQh)
      }
      if (tenTt && tenQh && tenXp) {
        setDiaChi(tenTt + "," + tenQh + "," + tenXp)
      }
       
    }
    useEffect(() => {
        axios.get('http://localhost:3001/address/tinhthanh')
            .then((result) => {
                setTinhthanh(result.data);

            })

    }, []);

    const handleTinhthanh = (id) => {
        // console.log("tinhthanh",id)
        let idma = id.slice(0, id.indexOf('_'));
        let name = id.slice(id.indexOf('_') + 1);
        setTenTt(name);

        axios.get('http://localhost:3001/address/quanhuyen')
            .then((result) => {

                const dt = result.data.filter((a) => a.TinhThanhTTMa == idma)
                setQuanhuyen(dt);
            })

    }
    

    const handleQuanhuyen = (id) => {
        let idmaqh = id.slice(0, id.indexOf('_'));
        let nameqh = id.slice(id.indexOf('_') + 1);
        setTenQh(nameqh);
        axios.get('http://localhost:3001/address/xaphuong')
            .then((result) => {
                const dt = result.data.filter((a) => a.QuanHuyenQHMa == idmaqh)
                setXaphuong(dt);
            })

    }
    const handleXaPhuong = (id) => {
        let idmaqh = id.slice(0, id.indexOf('_'));
        let nameqh = id.slice(id.indexOf('_') + 1);
        setTenXp(nameqh);

    }

    // console.log("diachi",diachi);

// ///////
    useEffect(() => {
        fetch(`http://localhost:3001/batdongsan/${id.idgd}/${id.idbds}`)
            .then(res => res.json())
            .then(tinbds => {
                setTinbds(tinbds);
            })

    }, [])

   

      const handlePrice = (id)=>{
        if (id == 0) {
            setMinPrice("");
            setMaxPrice("");
      
          }
          if (id == 1) {
            setMinPrice(1);
            setMaxPrice(20000);
      
          }
          if (id == 2) {
            setMinPrice(20000);
            setMaxPrice(40000);
      
          }
          if (id == 3) {
            setMinPrice(40000);
            setMaxPrice(60000);
      
          }
          if (id == 14) {
            setMinPrice(60000);
            setMaxPrice(100000);
      
          }
          if (id == 4) {
            setMinPrice(100000);
            setMaxPrice(300000);
      
          }
          if (id == 5) {
            setMinPrice(300000);
            setMaxPrice(500000);
      
          }
          if (id == 6) {
            setMinPrice(500000);
            setMaxPrice(1000000);
      
          }
          if (id == 7) {
            setMinPrice(1000000);
            setMaxPrice(3000000);
      
          }
          if (id == 8) {
            setMinPrice(3000000);
            setMaxPrice(7000000);
      
          }
          if (id == 9) {
            setMinPrice(7000000);
            setMaxPrice(10000000);
      
          }
          if (id == 10) {
            setMinPrice(10000000);
            setMaxPrice(30000000);
      
          }
          if (id == 11) {
            setMinPrice(30000000);
            setMaxPrice(50000000);
      
          }
          if (id == 12) {
            setMinPrice(50000000);
            setMaxPrice(80000000);
      
          }
          if (id == 13) {
            setMinPrice(0);
            setMaxPrice(0);
          }      

      }

      const handleDienTich = (id)=>{
        if(id==0){
            setMinDienTich("");
            setMaxDienTich("");
            
        }
        if(id==1){
            setMinDienTich(0);
            setMaxDienTich(30);
            
        }
        if(id==2){
            setMinDienTich(30);
            setMaxDienTich(50);
            
        }
        if(id==3){
            setMinDienTich(50);
            setMaxDienTich(100);
            
        }
        if(id==4){
            setMinDienTich(100);
            setMaxDienTich(200);
            
        }
        if(id==5){
            setMinDienTich(200);
            setMaxDienTich(300);
            
        }
        if(id==6){
            setMinDienTich(300);
            setMaxDienTich(500);
            
        }

      }

      const handleReSert =() =>{
        
        setTenTt("");
        setTenQh("");
        setTenXp("");
        setDiaChi("");
      }

    
    //   const formatter = new Intl.NumberFormat( {
    //     style: 'currency',
    //     currency: 'VND',
      
        
    //   });
// new Date().toLocaleString() + ''
    //   console.log("min",minPrice);
    return (
       
            <div  className={styles.productsview}>
                <h2>Bất động sản</h2>
                <Row>
                    <Col md={2} className={styles.colFilter}>
                    
                    <Filter handlePrice={handlePrice} handleDienTich={handleDienTich} 
                    tinhthanh={tinhthanh} quanhuyen={quanhuyen} xaphuong={xaphuong} 
                    handleTinhthanh={handleTinhthanh} handleQuanhuyen={handleQuanhuyen}
                     handleXaPhuong={handleXaPhuong} handleReSert={handleReSert} AdressFilter={AdressFilter}/>

                    
                    </Col>
                    <Col md={10} className={styles.colContent}>
                   
                <div className={styles.bdscontent}>
                {/* console.log("min",minPrice) */}
            {
                
            tinbds.filter( item => { return ( minPrice=="" && maxPrice=="" ) ?item : (item.BDS_Gia >=minPrice &&  item.BDS_Gia <= maxPrice) })
            .filter( item => {return (minDienTich=="" && maxDienTich=="" )?item : (item.BDS_DienTich >= minDienTich &&  item.BDS_DienTich <= maxDienTich )})
            .filter( item => { return (diachi=="") ? item :(item.BDS_DiaChiCuThe.toLowerCase().includes(diachi.toLowerCase()))})
            .map(a => (
                <div className={styles.boxFlex} key={a.BDS_Ma}  >
                    <Card className={styles.bdsbox} >
                        <div  className={styles.bdsimg}>
                        <Card.Img style={{height: "200px"}}  variant="top" src={`http://localhost:3001/${a.HinhBDs[0].HA_DuongDan}`} />
                        <span className={styles.lb}>{a.LoaiGiaoDich.LGD_Ten}</span>
                        </div>
                        <Card.Body>
                            <Card.Title className={styles.TenBds}>{a.BDS_Ten}</Card.Title>
                            <Card.Text>
                                <div className={styles.gia}><span style={{color:"red"}}>{ PriceFormat(a.BDS_Gia)}</span>
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
                        <span className= {styles.show}><Link to={`/batdongsan/${a.BDS_Ma}`} >Xem chi tiết <i className="fas fa-chevron-right"></i></Link></span>
                        </Card.Footer>
                    </Card>
                    
                    
                

                </div>
            ))
            }
            </div>
            </Col>
                </Row>
            </div>
        
    );

}



export default Tinbds;