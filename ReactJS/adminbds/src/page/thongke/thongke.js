import React from "react";
import {Link } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {Row,Col} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import BarChart from "./BarChart";
import LoaiThueThang from './loaiThueThang';
import LoaiMuaThang from './loaiMuaThang'
import styles from './thongke.module.css'

function Thongke() {
    const [thongke,setThongke] = useState([]);
    const [countLoai, setCountLoai] = useState([])
    const [tongTin, setTongTin] = useState();
    const [sotk, setSoTK] = useState();

    // tong tai khoan
    useEffect(() => {
      axios.get("http://localhost:3001/thongke/tonguser")
      .then(response =>{
        setSoTK(response.data)
          
      })
      .catch(err =>{
          console.log(err);
      })
  }, []);
    // tong tin
    useEffect(() => {
      axios.get("http://localhost:3001/thongke/tongtin")
      .then(response =>{
        setTongTin(response.data)
          
      })
      .catch(err =>{
          console.log(err);
      })
  }, []);
// console.log("tong",tongTin);
  // tin theo thang
    useEffect(() => {
        axios.get("http://localhost:3001/thongke/tintheothang")
        .then(response =>{
            setThongke(response.data)
            
        })
        .catch(err =>{
            console.log(err);
        })
    }, []);

    //tin thang cua cac loai

    useEffect(() => {
      axios.get("http://localhost:3001/thongke/tinloai")
      .then(response =>{
        setCountLoai(response.data)
          // console.log(response.data)
      })
      .catch(err =>{
          console.log(err);
      })
  }, []);

    

      const data = {
        labels: thongke.map((data) => data.month),
        datasets: [
          {
            label: "Số lượng các tin đã đăng theo tháng",
            data: thongke.map((data) => data.sl_Bds),
            backgroundColor: [
              "rgba(75,192,192,1)"
              
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      }
     

    return(
        // <h1>a</h1>
        <div className={styles.box}>
          <Row>
           
            <Col>
          <div className={styles.barChart} >
              <h5>Số bài đăng theo tháng trong năm 2022</h5>
              <BarChart chartData={data}/>
            
          </div>
        </Col>
        <Col>
            <h4>thống kê số lượng</h4>
            <div className={styles.boxCount}>
              <div className={styles.ItemCount}>
                <div className={styles.ItemTk}>
                <h2 className={styles.textValue}>{sotk}</h2>
                <p className={styles.textValue}>Tài khoản</p>
                  <div className={styles.contentCount}>
                    <p className={styles.text}>Xem chi tiết</p>
                  </div>
                </div>
                
              </div>
              <div className={styles.ItemCount}>
              <div className={styles.ItemTk1}>
                  <h2 className={styles.textValue}>{tongTin}</h2>
                  <p className={styles.textValue}>Số bài đăng</p>
                 <div className={styles.contentCount}>
                    <p className={styles.text}>Xem chi tiết</p>
                  </div>
                </div>
                
              </div>
            </div>
        </Col>
          </Row>
        <div className={styles.loai}>
          <Row className={styles.Rowloai}>
            <Col className={styles.ColLoai}>
            <LoaiThueThang />
          </Col>
          </Row>
          <Row className={styles.Rowloai}>
          <Col >
          <LoaiMuaThang />
          </Col>
          </Row> 
          
          </div>
        
        </div>
    )
}
export default Thongke;