import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import styles from './lienhe.module.css';

function Lienhe() {
    const [lienhe, setLienhe] = useState([]);

    useEffect(() => {
        loadLienhe();
    }, []);

    const loadLienhe = async () => {
        const result = await axios.get('http://localhost:3001/lienhe');
        setLienhe(result.data);
        
    }


    return (
        
            <div className={styles.boxNews}>
            <div className={styles.contentNews}>
                <h2>DANH SÁCH</h2>
                <div className={styles.btnAdd}>
                {/* <HandellAddNews /> */}
                </div>
                <Table className="table-sm" >
                    <thead className="table-dark">
                        <tr >
                            <th>STT</th>
                            <th>Tên </th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th >Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lienhe.map((lienhe,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{lienhe.LH_TenChuSoHuu}</td>
                                    <td>
                                        {lienhe.LH_SoDienThoai}
                                    </td>
                                    <td>{lienhe.LH_Email}</td>
                                    <td>{lienhe.LH_DiaChi}</td>
                                    
                                    <td><Link className="btn btn-success" to ={`/lienhe/edit/${lienhe.LH_Ma}`}><EditIcon /></Link></td>
                                   
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            </div>
        

    )

}

export default Lienhe;