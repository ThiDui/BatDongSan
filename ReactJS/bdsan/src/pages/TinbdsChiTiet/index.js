import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import AddYeuCau from './addYeuCau';
import PopoversYeuCau from './PopoversYeuCau';
import parse from 'html-react-parser';
import Axios from 'axios';

import styles from './ChitietBds.module.css';
import './gallery.css';

function TinbdsChiTiet() {
    const { id } = useParams();

    const [bds, setBds] = useState([]);


    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        Axios.get(`http://localhost:3001/batdongsan/${id}`)

            .then((response) => {

                setBds(response.data);

            })

    }, [])

    const formatter = new Intl.NumberFormat({
        style: 'currency',
        currency: 'VND',

    });

    const handleImg = () =>{
        let images = [];

        bds.map(a => (


            a.HinhBDs.forEach(i => {
                images.push({
                    original: `http://localhost:3001/${i.HA_DuongDan}`,
                    thumbnail: `http://localhost:3001/${i.HA_DuongDan}`

                })
            })

        ))
        return images;
            
    }

    

let img=handleImg();

    //   console.log("BDS", bds)
    return (

        <div className={styles.products}>
            
            {
                bds.map(a => (
                    <div key={id} className=" box-chitiet">

                        
                        <div className='container'>
                            <div className={styles.content}>
                                    <div className="row">
                                    <div className="col-sm-8 p-3 " >
                                    <div className={styles.galleryCenter}>
                                    <ImageGallery  items= {handleImg()}  />
                                    </div>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-sm-8 p-3 " >
                                        <div className={styles.contenBds}>
                                            <div className={styles.headerBds}>
                                                <span className={styles.headerItem}><i className="fas fa-bed fa-lg"></i>Phòng ngủ: {a.BDS_SoPhongNgu}</span>
                                                <span className={styles.headerItem}><i className="fas fa-bath fa-lg"></i>Phòng tắm: {a.BDS_SoPhongTam}</span>
                                                <span className={styles.headerItem}><i className="fas fa-arrows-alt fa-lg"></i>Diện tích: {a.BDS_DienTich}</span>
                                                <span className={`${styles.headerItem} ${styles.itemRight}`}>Giá: {formatter.format(a.BDS_Gia)}</span>
                                            </div>

                                            <div >
                                                <h2 className={styles.nameContent}>{a.BDS_Ten}</h2>
                                                <p className={styles.address}><i className="fas fa-map-marker-alt fa-lg map"></i>{a.BDS_DiaChiCuThe} </p>
                                            </div>

                                            <div className={styles.motachitiet}>
                                                <h4 className={styles.titleBds}>Thông tin chi tiết</h4>
                                                <p>{parse(a.BDS_MoTaChiTiet)}</p>
                                            </div>
                                            <div className={styles.dacdiemBds}>
                                                <h4 className={styles.titleBds}>Đặc điểm bất động sản</h4>
                                                <p>Loại tin đăng: </p>
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
                                                        <span className={styles.dacdiemValue}>{formatter.format(a.BDS_Gia)}</span>
                                                    </div>




                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-sm-4 p-3">

                                        <div className={styles.userDang}>
                                            <div className={styles.profile}>
                                                <img src={`http://localhost:3001/${a.User.avatar}`} alt="Avatar" className={styles.avatar} />
                                                <div>Được đăng bởi</div>
                                                <p className={styles.tenSh}>{a.User.username}</p>
                                            </div>

                                            <div className={styles.sdt}>
                                                <span><i class="fas fa-phone"></i></span>
                                                <span> 0{a.User.phone}</span>
                                            </div>

                                            <br></br>

                                            <div >
                                                {/* dataemail={ data.email} dataphone={ data.phone} dataaddress={data.address} */}
                                                <button type="button" className={styles.btnLienhe}>
                                                    {
                                                        (user != null) ?
                                                            <AddYeuCau BDS_Ma={a.BDS_Ma} LH_Email={a.LienHe.LH_Email} LH_TenChuSoHuu={a.LienHe.LH_TenChuSoHuu} />
                                                            : <PopoversYeuCau />
                                                    }


                                                </button>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <div className={styles.chuLH}>
                                            <ListGroup>
                                                <ListGroup.Item active> Chủ sở hữu</ListGroup.Item>
                                                <ListGroup.Item>{a.LienHe.LH_TenChuSoHuu}</ListGroup.Item>
                                                <ListGroup.Item>{a.LienHe.LH_SoDienThoai}</ListGroup.Item>
                                                <ListGroup.Item>{a.LienHe.LH_Email}</ListGroup.Item>
                                                <ListGroup.Item>{a.LienHe.LH_DiaChi}</ListGroup.Item>

                                            </ListGroup>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default TinbdsChiTiet;