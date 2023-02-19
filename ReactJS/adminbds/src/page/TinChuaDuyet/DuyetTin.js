import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from './tinchuaduyet.module.css';
import React, { useState } from 'react';



function DuyetTin(props) {
  //  const navigate = useNavigate();
//   const {id} = useParams();
// console.log("prop",props.data.data)
  const trangthai = {BDS_TrangThai: "Đã duyệt"}

  // console.log(trangthai);
  
  const handleSubmit = () => {
    
    axios.put(`http://localhost:3001/batdongsan/${props.data.data}`,{
    BDS_TrangThai : trangthai.BDS_TrangThai})
    .then(() => {
      alert("Success update!");
      window.location.href=`http://localhost:3004/batdongsan/detail/${props.data.data}`;
  })
    
    //  navigate(`http://localhost:3001/batdongsan/detail/${props.data.BDS_Ma}`);  
}
 
  
  
  return (
    <div>
     
      <Modal {...props} centered >
        <div className={styles.formDuyetTin}>
            <div className={styles.titleDuyetTin}><h3>Duyệt tin bất động sản</h3></div>
          
            <div className={styles.contentDuyetTin}>Bạn có chắc chắn đang muốn duyệt tin bất động sản này!</div>
            <div className={styles.actionDuyetTin}>
                <Button variant="success" className={styles.btnDuyetTin} type="submit" onClick={handleSubmit}>
                Duyệt tin
                </Button>

                <Button variant="success" className={styles.btnDuyetTin} type="submit" >
                Trở về
                </Button>
            </div>
        </div>
      </ Modal>
    </div>
  );
}

function HandelDuyetTin(dataid) {
  const [modalShow, setModalShow] = useState(false);

  const handleDelete=  (id)=>{
    let text = "Bạn có chắc chắn muốn xóa bài đăng này!";
    if (window.confirm(text) == true) {
         axios.delete(`http://localhost:3001/batdongsan/${id}`)
        window.location.href="/";
    } 
   
  }

  return (
    <>
        <p>(*) Tin bất động sản này hiện chưa được duyệt! </p>
      <Button variant="dark" onClick={() => setModalShow(true)} className="btn-login">
        Duyệt tin bất động sản
      </Button>

      &emsp;   &emsp;

      <Button variant="danger" onClick={()=>{handleDelete(dataid.data)}} >
        Xóa bất động sản
      </Button>

      <DuyetTin
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={dataid} 
      />
    </>
  );
}

export default HandelDuyetTin;