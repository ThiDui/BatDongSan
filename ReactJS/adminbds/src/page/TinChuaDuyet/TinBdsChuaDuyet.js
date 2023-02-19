import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import styles from './tinchuaduyet.module.css';
import format from '../format/formatDateTime';
import { Form, FormControl } from 'react-bootstrap';

function TinBDS() {
    const [tinbds, setTinBDS] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadTinBDS();
    }, []);

    const loadTinBDS = async () => {
        const result = await axios.get('http://localhost:3001/batdongsan/notapproved');
        setTinBDS(result.data);

    }


    // const deleteNews= async (id)=>{
    //     await axios.delete(`http://localhost:3001/tinbds/${id}`)
    //     loadNews();
    // }

    return (

        <div className={styles.box}>
            <div className={styles.contentTin}>
                <h4>DANH SÁCH TIN CHỜ DUYỆT</h4>
                <div className={styles.btnAdd}>
                    <div className={styles.btnSearch} >
                        <Form.Group>
                            <FormControl className="w-50" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                    </div>
                    
                </div>
                <Table className="table-sm" bordered >
                    <thead className={styles.tablecolor}>
                        <tr >
                            <th>STT</th>
                            <th>Giao dịch</th>
                            <th>Loại</th>
                            <th>Tên bất động sản</th>
                            <th>Chủ sở hữu</th>
                            <th>Ngày đăng</th>
                            <th>Trạng thái</th>
                            <th>Tài khoản</th>
                            <th colSpan={2}>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tinbds.filter((item)=>{
                                return search.toLowerCase()===''? item : item.BDS_Ten.toLowerCase().includes(search)
                            }).map((tinbds, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{tinbds.LoaiGiaoDich.LGD_Ten}</td>
                                    <td>{tinbds.LoaiBD.L_Ten}</td>
                                    <td>{tinbds.BDS_Ten.toUpperCase()}</td>
                                    <td>{tinbds.LienHe.LH_TenChuSoHuu}</td>
                                    <td>{format.formatVNDate( tinbds.BDS_NgayDang) +" "+ format.formatTime( tinbds.BDS_NgayDang)}</td>
                                    <td className='pt-3' ><span className={styles.btnNot}>{tinbds.BDS_TrangThai}</span></td>
                                    <td>{tinbds.User.username}</td>
                                    <td><Link className="btn" to={`/batdongsan/detail/${tinbds.BDS_Ma}`}><RemoveRedEyeIcon style={{ color: "#3a98b8" }} fontSize='small' /></Link></td>
                                
                                    <td>
                                        <Link className="btn " ><DeleteForeverIcon style={{ color: "red" }} /></Link>
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

export default TinBDS;