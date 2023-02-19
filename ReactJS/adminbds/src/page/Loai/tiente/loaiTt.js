import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';

import HandellAddTt from './AddTt';
import styles from '../loai.module.css';
function Loaitt(){
    const [loaitt, setLoaitt] = useState([]);

    useEffect(() => {
        loadloai();
    }, []);

    const loadloai = async () => {
        const result = await axios.get('http://localhost:3001/loaitiente');
        setLoaitt(result.data);
        
    }

    const deleteloai=  (id)=>{
        let text = "Bạn có chắc chắn muốn xóa loaij giao dich này!";
        if (window.confirm(text) == true) {
             axios.delete(`http://localhost:3001/loaitiente/${id}`)
             window.location.href="/loai";
        } 
       
      }
    // const deleteloai= async (id)=>{
    //     await axios.delete(`http://localhost:3001/loaitiente/${id}`)
    //     loadloai();
    // }

    return (
        
            <div className={styles.boxgd}>
            <div className={styles.contentgd}>
                <h4>DANH SÁCH LOẠI TIỀN TỆ</h4>
                <div className={styles.btnAdd}>
                    <HandellAddTt />
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
                            loaitt.map((loai,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{loai.LTT_Ten}</td>
                                    
                                    <td><Link className="btn " to ={`/loaitiente/edit/${loai.LTT_Ma}`}><BorderColorOutlinedIcon style={{ color: "#3a98b8" }} /></Link></td>
                                    <td>
                                        <Link className="btn " onClick={()=>{deleteloai(loai.LTT_Ma)}}><DeleteForeverIcon style={{ color: "red" }}/></Link>
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

export default Loaitt;