import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {ListGroup,Button} from 'react-bootstrap';
import styles from "./tinbds.module.css";
import RoomIcon from '@mui/icons-material/Room';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import axios from 'axios';
import parse from 'html-react-parser';
import DuyetTin from '../TinChuaDuyet/DuyetTin';
import PriceFormat from '~/Services/priceFormat';
import EditNews from "../News/EditNews";

function DetailBDS() {
    const { id } = useParams();
    const [tinbds, setTinBDS] = useState([]);
    const [bds, setBds] = useState([]);
    const [check, setCheck] = useState("");
    useEffect(() => {

        axios.get(`http://localhost:3001/batdongsan/${id}`)

            .then((response) => {

                setBds(response.data);
            })

    }, [])


    useEffect(() => {
        loadTinBDS();
    }, []);

    const loadTinBDS = async () => {
        const result = await axios.get('http://localhost:3001/batdongsan');
        setTinBDS(result.data);

    }

    const handleAdress =()=>{
        let tempt = 0; 
            bds.map(a=>(
                
            tinbds.forEach(element => {
                if(element.BDS_DiaChiCuThe==a.BDS_DiaChiCuThe){
                    tempt = 1;
                    
                    return tempt;
                    
                    // console.log("trung");
                    
                    
                }
                // else{
                //      return
                // }
                // console.log(tempt)
                
            })

            

            ))
            // if(tempt==1){
            //     {
            //         <h1>trung </h1>
            //     }
            // }
           
    }
    // handleAdress()
    //   console.log("check",check)
   
    return (
        <div className={styles.box}>
            <div className={styles.boxTB}>
                <h4 style={{color:"blue"}}> <span style={{color:"red"}}><WarningAmberIcon /></span> Chú ý khi duyệt tin</h4>
                <span style={{color:"blue"}}><DownloadDoneIcon /></span> <span>Bạn cần kiểm tra tính chính xác tin yêu cầu. </span><br />
                <span style={{color:"blue"}}><DownloadDoneIcon /></span> <span>Cần đảm bảo tin có đầy đủ thông tin liên quan. </span>
                {/* <span><DownloadDoneIcon /></span> <span>Bạn cần kiểm tra tính chính xác tin yêu cầu. </span> */}

            </div> <br/>

            <div>
                
            </div>
            {
                bds.map(a => (
                    <div key={id} >
                        
                            <div className={styles.contentDT}>
                                <div className="row">
                                    <div className="col-sm-8 " >
                                        <div className={styles.contenBds}>
                                           

                                            <div >
                                                <h2 className={styles.nameContent}>{a.BDS_Ten}</h2>
                                                <p className={styles.address}><RoomIcon />{a.BDS_DiaChiCuThe} </p>
                                            </div>

                                            <div className={styles.motachitiet}>
                                                <h4 className={styles.titleBds}>Thông tin chi tiết</h4>
                                                <p>{parse(a.BDS_MoTaChiTiet)}</p>
                                            </div>
                                            <div className={styles.dacdiemBds}>
                                                <h4 className={styles.titleBds}>Đặc điểm bất động sản</h4>
                                                <p>Loại tin đăng: {a.LoaiGiaoDich.LGD_Ten}</p>
                                                <div className={styles.dacdiemBox}>
                                                    <div className={styles.dacdiemItem}>
                                                        <span className={styles.dacdiemIcon}><i className="fas fa-arrows-alt fa-lg"></i></span>
                                                        <span className={styles.dacdiemTitle}>Diện tích:</span>
                                                        <span className={styles.dacdiemValue}>{a.BDS_DienTich}</span>
                                                    </div>
                                                    <div className={styles.dacdiemItem}>
                                                        <span className={styles.dacdiemIcon}><i className="fas fa-bed fa-lg"></i></span>
                                                        <span className={styles.dacdiemTitle}>Phòng ngủ:</span>
                                                        <span className={styles.dacdiemValue}>{a.BDS_SoPhongNgu}</span>
                                                    </div>
                                                    <div className={styles.dacdiemItem}>
                                                        <span className={styles.dacdiemIcon}><i className="fas fa-bath fa-lg"></i></span>
                                                        <span className={styles.dacdiemTitle}>Phòng tắm:</span>
                                                        <span className={styles.dacdiemValue}>{a.BDS_SoPhongTam}</span>
                                                    </div>
                                                    <div className={styles.dacdiemItem}>
                                                        <span className={styles.dacdiemIcon}><i className="fas fa-arrows-alt fa-lg"></i></span>
                                                        <span className={styles.dacdiemTitle}>Giá:</span>
                                                        <span className={styles.dacdiemValue}>{PriceFormat(a.BDS_Gia)} {a.LoaiTienTe.LTT_Ten}</span>
                                                    </div>




                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-sm-4 p-3">
                                        {/* <div className={styles.lienhe}>
                                            <p className={styles.tenSh}>{a.LienHe.LH_TenChuSoHuu}</p>
                                            <div><button className="btn btn-info btn-lg">0813560531</button></div>
                                            <br></br>
                                            <div className={styles.emailSh}><button className={styles.btnLienhe}>Gửi email</button></div>
                                            <button type="button" className={styles.btnLienhe}>Yêu cầu liên hệ lại</button>
                                        </div> */}
                                        <ListGroup>
                                        <ListGroup.Item active> Chủ sở hữu</ListGroup.Item>
                                            <ListGroup.Item>{a.LienHe.LH_TenChuSoHuu}</ListGroup.Item>
                                            <ListGroup.Item>{a.LienHe.LH_SoDienThoai}</ListGroup.Item>
                                            <ListGroup.Item>{a.LienHe.LH_Email}</ListGroup.Item>
                                            <ListGroup.Item>{a.LienHe.LH_DiaChi}</ListGroup.Item>
                                            
                                        </ListGroup>
                                        <br />
                                        <div >
                                            <p className={styles.headerImg}>Hình ảnh bất động sản</p>
                                        </div>
                                        <div className={styles.rowImg}>
                                        {
                                            a.HinhBDs.map((img,index) => (
                                                
                                                    <div key ={index} className={styles.colImg}>
                                                    <img   src={`http://localhost:3001/${img.HA_DuongDan}`} className={styles.imgIndex}/> 
                                                    </div>
                                                
                                            // console.log(img,index)
                                                

                                                
                                            ))
                                        }
                                        </div>
                                    </div>
                                </div>
                                {/* xu ly trang thai tin dang */}
                                <div className={styles.boxTrangThai}>
                                    
                                    <div><h4>Trạng thái tin đăng</h4></div>
                                    {
                                        (a.BDS_TrangThai === "Đã duyệt") ? <Button><DoneAllIcon/> Tin đã được duyệt</Button>
                                        : <div className={styles.trangthai}> 
                                            <span><DuyetTin data={a.BDS_Ma}/></span>
                                            {/* <span><Button variant="danger">Xóa tin bất động sản</Button></span> */}
                                        </div> 
                                    }
                                        
                                </div>

                            </div>
                        
                    </div>
                ))
            }
        </div>
    );
}


export default DetailBDS;