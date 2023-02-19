import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';


import HandellAddbds from './Addbds';
import styles from '~/page/News/news.module.css';
function Loaibds(){
    const [loaibds, setLoaibds] = useState([]);

    useEffect(() => {
        loadloai();
    }, []);

    const loadloai = async () => {
        const result = await axios.get('http://localhost:3001/loaibatdongsan');
        setLoaibds(result.data);
        
    }
    const deleteloai=  (id)=>{
        let text = "Bạn có chắc chắn muốn xóa loại bất động sản này!";
        if (window.confirm(text) == true) {
             axios.delete(`http://localhost:3001/loaibatdongsan/${id}`)
             window.location.href="/loai";
        } 
       
      }

    // const deleteloai= async (id)=>{
    //     await axios.delete(`http://localhost:3001/loaibatdongsan/${id}`)
    //     loadloai();
    // }

    return (
        
            <div className={styles.boxNews}>
            <div className={styles.contentNews}>
                <h4>DANH SÁCH LOẠI BẤT ĐỘNG SẢN</h4>
                <div className={styles.btnAdd}>
                    <HandellAddbds />
                </div>
                <Table className="table-sm" >
                    <thead className={styles.tablecolor}>
                        <tr >
                            <th>STT</th>
                            <th>Tên loại</th>
                            <th colSpan={2}>Option</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loaibds.map((loai,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{loai.L_Ten}</td>
                                    
                                    <td><Link className="btn " to ={`/loaibatdongsan/edit/${loai.L_Ma}`}><BorderColorOutlinedIcon style={{ color: "#3a98b8" }} /></Link></td>
                                    <td>
                                        <Link className="btn " onClick={()=>{deleteloai(loai.L_Ma)}}><DeleteForeverIcon style={{ color: "red" }}/></Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            </div>
        

    )


}

export default Loaibds;