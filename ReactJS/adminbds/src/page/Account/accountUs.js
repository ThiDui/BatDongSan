import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import styles from './account.module.css';

import { Form, FormControl } from 'react-bootstrap';

function Account() {
    const [account, setAccount] = useState([]);
    const [search, setSearch] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        loadTinBDS();
    }, []);

    // console.log("account",account)

    const loadTinBDS = async () => {
        const result = await axios.get('http://localhost:3001/account/user');
        setAccount(result.data);

    }

    const handleDelete=  (id)=>{
        let text = "Bạn có chắc chắn muốn xóa bài đăng này!";
        if(user.roles[0] != "ROLE_ADMIN"){
            alert("Bạn không có đủ quyền thực hiện chức năng này!")
        }
        else
        if (window.confirm(text) == true) {
             axios.delete(`http://localhost:3001/batdongsan/${id}`)
             window.location.href="/batdongsan";
        } 
       
      }
    

    return (

        <div className={styles.box}>
            <div className={styles.contentTin}>
                <h2>DANH SÁCH </h2>
                <div className={styles.btnAdd}>
                    <div className={styles.btnSearch} >
                        <Form.Group>
                            <FormControl className="w-50" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                    </div>
                    {/* <div>
                        <Link className="btn btn-info" style={{ color: "white" }} to="/batdongsan/add"><AddOutlinedIcon />Thêm mới</Link>
                    </div> */}
                </div>
                <Table className="table-sm" bordered >
                    <thead className={styles.tablecolor}>
                        <tr >
                            <th>STT</th>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Chức vụ</th>
                            <th>Quyền</th>
                            <th >Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            account.filter((item)=>{
                                return search.toLowerCase()===''? item : item.username.toLowerCase().includes(search)
                            }).map((account, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src="https://toigingiuvedep.vn/wp-content/uploads/2021/06/anh-chat-ngau-nu.jpg" alt="Avatar" className={styles.avatar} /></td>
                                    <td>{account.username}</td>
                                    <td>{account.email}</td>
                                    {/* <td>{account.LienHe.LH_TenChuSoHuu}</td> */}
                                    <td>{account.phone}</td>
                                    <td>{account.address}</td>
                                    <td>{account.UserRoles[0].ChucVu.ten_chucvu}</td>
                                    <td>{account.Roles[0].QTC_Ten}</td>
                                    {/* <td><Link className="btn" to={`/batdongsan/detail/${account.BDS_Ma}`}><RemoveRedEyeIcon style={{ color: "#3a98b8" }} fontSize='small' /></Link></td> */}
                                    {/* <td><Link className="btn" to={`/batdongsan/edit/${account.BDS_Ma}`}><BorderColorOutlinedIcon style={{ color: "#3a98b8" }} fontSize='small' /></Link></td> */}
                                    <td  onClick={()=> handleDelete(account.BDS_Ma)}>
                                        <DeleteForeverIcon style={{ color: "red" }}  />
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

export default Account;