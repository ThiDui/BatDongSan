import React from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Form,Table} from 'react-bootstrap';
import styles from './thongke.module.css'
import BarChartMua from "./BarChartMua";

function SoLoaiThue() {
    
    const [countLoai, setCountLoai] = useState([])
    const [monthM, setMonthM] = useState(6);
    const dataMoth=[1,2,3,4,5,6,7,8,9,10,11,12];
    

    useEffect(() => {
      axios.get("http://localhost:3001/thongke/tinloaitheothangmua")
      .then(response =>{
        setCountLoai(response.data)
          console.log(response.data)
      })
      .catch(err =>{
          console.log(err);
      })
  }, []);

    // console.log("loai",countLoai)

  const handleMonth = (id) => {
    setMonthM(id);
  }
     
// console.log("mu",monthM)


const dataMua = {
    labels: countLoai.filter(item => { return (monthM == "") ? item : (item.month == monthM) })
    .map ((data) => data.L_Ten),
    datasets: [
      {
        label:" ",
        data: countLoai.filter(item => { return (monthM == "") ? item : (item.month == monthM) })
        .map((data) => data.soloai),
        backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
        borderColor: "black",
        borderWidth: 2,
        
      },
      
    ],
    
  }
    return(
        // <h1>a</h1>
        <div className={styles.tablecolor}>
        <h5 className={styles.titleLoai}>Số lượng bài đăng của mỗi loại (mua) theo tháng</h5><br/>
        <Form.Select style={{width: "200px"}}  onChange={(e) => handleMonth(e.target.value)}>
        <option >Tháng</option>
        {dataMoth.map( a=>(
            <option key={a} value={a}>Tháng {a}</option>
        ))}
            {/* <option value="6">Tháng 6</option>
            <option value="11">Tháng 11</option> */}

          </Form.Select>
          <br/>
        <Table className="table-sm" bordered >
                    {/* <thead >
                        <tr >
                            <th>STT</th>
                            <th>Loại bất động sản</th>
                            <th>Tháng</th>
                            <th>Số bài đăng</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody> */}
                    <BarChartMua chartDataMua={dataMua}/>
                        {/* {
                            
                            
                            countLoai.filter(item => { return (monthM == "") ? item : (item.month == monthM) })
                            .map((data,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{data.L_Ten}</td>
                                    <td>{data.month}</td>
                                    <td>{data.soloai}</td>
                                    
                                </tr>
                            ))
                           
                        } */}
                    {/* </tbody> */}
                </Table>
                
        </div>
    )
}
export default SoLoaiThue;