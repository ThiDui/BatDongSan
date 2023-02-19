import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';

import HandellAddGd from './AddGd';
import styles from '../loai.module.css';
function Loaigd(){
    const [loaigd, setLoaigd] = useState([]);

    useEffect(() => {
        loadloai();
    }, []);

    const loadloai = async () => {
        const result = await axios.get('http://localhost:3001/loaigiaodich');
        setLoaigd(result.data);
        
    }
    const deleteloai=  (id)=>{
        let text = "Bạn có chắc chắn muốn xóa loaij giao dich này!";
        if (window.confirm(text) == true) {
             axios.delete(`http://localhost:3001/loaigiaodich/${id}`)
             window.location.href="/loai";
        } 
       
      }


    // const deleteloai= async (id)=>{
    //     await axios.delete(`http://localhost:3001/loaigiaodich/${id}`)
    //     loadloai();
    // }

    return (
        <div className={styles.boxgd}>
            <div className={styles.contentgd}>
                <h4>DANH SÁCH LOẠI GIAO DỊCH</h4>
                <div className={styles.btnAdd}>
                    <HandellAddGd />
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
                            loaigd.map((loai,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{loai.LGD_Ten}</td>
                                    
                                    {/* <td><Link className="btn" to ={`/loaigiaodich/edit/${loai.LGD_Ma}`}><BorderColorOutlinedIcon style={{ color: "#3a98b8" }} /></Link></td> */}
                                    <td>
                                        <Link className="btn " onClick={()=>{deleteloai(loai.LGD_Ma)}}><DeleteForeverIcon style={{ color: "red" }}/></Link>
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

export default Loaigd;