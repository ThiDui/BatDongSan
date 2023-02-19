import React from "react";
import {Link } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {Form,Table} from 'react-bootstrap';
import styles from './thongke.module.css'
import BarChartThue from "./BarChartThue";

function SoLoaiThue() {
    
    const [countLoai, setCountLoai] = useState([])
    const [monthThue, setMonth] = useState(6)
    const dataMothThue=[1,2,3,4,5,6,7,8,9,10,11,12];

    useEffect(() => {
      axios.get("http://localhost:3001/thongke/tinloaitheothang")
      .then(response =>{
        setCountLoai(response.data)
          console.log(response.data)
      })
      .catch(err =>{
          console.log(err);
      })
  }, []);

    

  const handleMonth = (id) => {
    setMonth(id);
  }
     
  const dataThue = {
    labels: countLoai.filter(item => { return (monthThue == "") ? item : (item.month == monthThue) })
    .map ((data) => data.L_Ten),
    datasets: [
      {
        label:" ",
        data: countLoai.filter(item => { return (monthThue == "") ? item : (item.month == monthThue) })
        .map((data) => data.soloai),
        backgroundColor: [
            "#2a71d0",
            
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "rgba(75,192,192,1)",
          ],
        borderColor: "black",
        borderWidth: 2,
        
      },
      
    ],
    
  }
    return(
        // <h1>a</h1>
        <div className={styles.tablecolor}>
        <h5 className={styles.titleLoai}>Số lượng bài đăng của mỗi loại (thuê) theo tháng</h5> <br/>
        <Form.Select style={{width: "200px"}}  onChange={(e) => handleMonth(e.target.value)}>
        <option >Tháng</option>
        {dataMothThue.map( a=>(
            <option key={a} value={a}>Tháng {a}</option>
        ))}
            

          </Form.Select>
          <br/>
          <BarChartThue chartDataThue={dataThue}/>
        {/* <Table className="table-sm" bordered >
                    <thead >
                        <tr >
                            <th>STT</th>
                            <th>Loại bất động sản</th>
                            <th>Tháng</th>
                            <th>Số bài đăng</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                           
                            countLoai.filter(item => { return (month == "") ? item : (item.month == month) })
                            .map((data,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{data.L_Ten}</td>
                                    <td>{data.month}</td>
                                    <td>{data.soloai}</td>
                                    
                                </tr>
                            ))
                           
                        }
                    </tbody>
                </Table> */}
        </div>
    )
}
export default SoLoaiThue;