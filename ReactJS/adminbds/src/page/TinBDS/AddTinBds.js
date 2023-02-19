import React, { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from "react-router-dom";
import styles from "./tinbds.module.css";
import HandellAddLh from '../Lienhe/AddLienhe';

import PriceFormat from '~/Services/priceFormat';

import axios from 'axios';
import { Form, Col, Row, FormControl, InputGroup, Button,Collapse } from 'react-bootstrap';

function AddTinBDS() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [mota, setMota] = useState('');

    const today = new Date();
    const current = new Date();
    current.setDate(current.getDate() + 5);
    // console.log("date", today);
    // console.log("END", current.toDateString());
    const [formValues, setFormValue] = useState({
        BDS_Ten: "", BDS_DienTich: "", BDS_Gia: "",
        BDS_SoPhongNgu: "", BDS_SoPhongTam: "", BDS_NgayDang: today,BDS_NgayHetHan:current ,
        BDS_DiaChiCuThe: "", BDS_TrangThai: "Đã duyệt", UserId: user.id, LoaiTienTeLTTMa: "",
        LoaiGiaoDichLGDMa: "", LoaiBDLMa: "", LienHeLHMa: "", XaPhuongXPMa: "",PL_Ten:"",
        LH_TenChuSoHuu: "",LH_SoDienThoai: "", LH_Email:"",LH_DiaChi:""
    });

    // new Date().toLocaleString() + ''
    const [openAddress, setOpenAddress] = useState(false);
    const [giaodich, setGiaodich] = useState([]);
    const [loaibds, setLoaibds] = useState([]);
    const [tiente, setTiente] = useState([]);
    const [tinhthanh, setTinhthanh] = useState([]);
    const [quanhuyen, setQuanhuyen] = useState([]);
    const [xaphuong, setXaphuong] = useState([]);
    const [tenTt, setTenTt] = useState("");
    const [tenQh, setTenQh] = useState("");
    const [diachi, setDiaChi] = useState("");

    const [quantity, setQuantity] = useState(0);
    const [quantityBr, setQuantityBr] = useState(0);

    const [lienhe, setLienhe] = useState([]);
    const [lienheTT, setLienheTT] = useState([]);
    const [img , setImg] = useState('');


    useEffect(() => {
        if(tenTt){
            setDiaChi(tenTt)
            // setDiaChi(tenTt +"," + tenQh + "," + formValues.XaPhuongXPMa.slice(formValues.XaPhuongXPMa.indexOf('_')+1))
        }
        if(tenTt && tenQh){
            setDiaChi(tenTt +"," + tenQh)
        }
        if(tenTt && tenQh && formValues.XaPhuongXPMa){
            setDiaChi(tenTt +"," + tenQh + "," + formValues.XaPhuongXPMa.slice(formValues.XaPhuongXPMa.indexOf('_')+1))
        }
        if(tenTt && tenQh && formValues.XaPhuongXPMa && formValues.BDS_DiaChiCuThe){
            setDiaChi(tenTt +"," + tenQh + "," + formValues.XaPhuongXPMa.slice(formValues.XaPhuongXPMa.indexOf('_')+1) + "," + formValues.BDS_DiaChiCuThe)
        }
       
    })

    useEffect(() => {
        axios.get('http://localhost:3001/address/tinhthanh')
            .then((result) => {
                setTinhthanh(result.data);

            })

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/loaibatdongsan')
            .then((result) => {
                setLoaibds(result.data);

            })

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/loaitiente')
            .then((result) => {
                setTiente(result.data);

            })

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/loaigiaodich')
            .then((result) => {
                setGiaodich(result.data);

            })

    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/lienhe')
            .then((result) => {
                setLienhe(result.data);

            })

    }, []);


    const handleTinhthanh = (id) => {
        let idma=id.slice(0,id.indexOf('_'));
        let name=id.slice(id.indexOf('_')+1);
        setTenTt(name);
        axios.get('http://localhost:3001/address/quanhuyen')
            .then((result) => {
                const dt = result.data.filter((a) => a.TinhThanhTTMa == idma)
                setQuanhuyen(dt);
            })

    }

    const handleQuanhuyen = (id) => {
        let idmaqh=id.slice(0,id.indexOf('_'));
        let nameqh=id.slice(id.indexOf('_')+1);
        setTenQh(nameqh);
        axios.get('http://localhost:3001/address/xaphuong')
            .then((result) => {
                const dt = result.data.filter((a) => a.QuanHuyenQHMa == idmaqh)
                setXaphuong(dt);
            })

    }

    const handleIncrement = () => {
        setQuantity(prevCount => prevCount + 1);
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const handleIncrementBr = () => {
        setQuantityBr(prevCount => prevCount + 1);
    }

    const handleDecrementBr = () => {
        if (quantityBr > 1) {
            setQuantityBr(prevCount => prevCount - 1);
        }
    }

    const handleLienhe = (id) => {
        axios.get('http://localhost:3001/lienhe')
            .then((result) => {
                const dt = result.data.filter((a) => a.LH_Ma == id)
                setLienheTT(dt);

            })

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValues, [name]: value });
        
    }

    const handleChangeMota =( e, editor ) => {
        const data = editor.getData();
        setMota(data);
        
    }

    // console.log("Data",formValues);

    const handleSubmit = (e) => {
        e.preventDefault();
        let idXa= formValues.XaPhuongXPMa.slice(0,formValues.XaPhuongXPMa.indexOf('_'));
        let formData = new FormData()
        formData.append('BDS_Ten',formValues.BDS_Ten)
        formData.append('BDS_DienTich',formValues.BDS_DienTich)
        formData.append('BDS_Gia',formValues.BDS_Gia)
        formData.append('BDS_SoPhongNgu',formValues.BDS_SoPhongNgu)
        formData.append('BDS_SoPhongTam',formValues.BDS_SoPhongTam)
        formData.append('BDS_NgayDang',formValues.BDS_NgayDang)
        formData.append('BDS_NgayHetHan',formValues.BDS_NgayHetHan)
        formData.append('BDS_MoTaChiTiet',mota)
        formData.append('BDS_DiaChiCuThe',diachi)
        formData.append('BDS_TrangThai',formValues.BDS_TrangThai)
        formData.append('UserId',formValues.UserId)
        formData.append('LoaiTienTeLTTMa',formValues.LoaiTienTeLTTMa)
        formData.append('LoaiGiaoDichLGDMa',formValues.LoaiGiaoDichLGDMa)
        formData.append('LoaiBDLMa',formValues.LoaiBDLMa)
        formData.append('LienHeLHMa',formValues.LienHeLHMa)
        formData.append('XaPhuongXPMa',idXa)
        formData.append('PL_Ten',formValues.PL_Ten);

        formData.append('LH_TenChuSoHuu',formValues.LH_TenChuSoHuu);
        formData.append('LH_SoDienThoai',formValues.LH_SoDienThoai);
        formData.append('LH_Email',formValues.LH_Email);
        formData.append('LH_DiaChi',formValues.LH_DiaChi);

        // formData.append('LH_TenChuSoHuu',formValues.LH_TenChuSoHuu);
        // formData.append('LH_SoDienThoai',formValues.LH_SoDienThoai);
        // formData.append('LH_Email',formValues.LH_Email);
        // formData.append('LH_DiaChi',formValues.LH_DiaChi);
       
        for (let i = 0 ; i < img.length ; i++) {
            formData.append("HA_DuongDan", img[i]);
        }
        axios.post("http://localhost:3001/batdongsan/create",formData, {
            
            headers: {
                 "Content-Type": "multipart/form-data",
                 
            }
           

        })
            .then(() => {
                alert("Success insert!");
                navigate("/batdongsan"); 
            })
            .catch(err =>{
                alert("Bạn phải nhập đầy đủ các mục (*) !");
            })
    }

    return (
        <div className={styles.box}>

                   

            <Form>
                <div className={styles.content}>
                    <div className={styles.form}>
                        <h4>Thông tin cơ bản</h4><br />
                        <div className={styles.GrAddress}>
                            <div className={styles.tinhthanh}>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Loại giao dịch <span className={styles.ic}>*</span> </Form.Label>
                                    <Form.Select aria-label="Default select example" name="LoaiGiaoDichLGDMa" onChange={handleChange}>
                                        <option value="#" disabled selected hidden>Chọn giao dịch</option>
                                        {
                                            giaodich.map((data, index) => {
                                                return (
                                                    <option key={index} value={data.LGD_Ma}>{data.LGD_Ten}</option>
                                                )
                                            })
                                        }

                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className={styles.quanhuyen}>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Loại bất động sản <span className={styles.ic}>*</span> </Form.Label>
                                    <Form.Select aria-label="Default select example" name="LoaiBDLMa" onChange={handleChange}>
                                        <option value="#" disabled selected hidden>VD: Nhà riêng</option>
                                        {
                                            loaibds.map((data, index) => {
                                                return (
                                                    <option key={index} value={data.L_Ma}>{data.L_Ten}</option>
                                                )
                                            })
                                        }

                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                       
                        <div className={styles.hr}>
                            <div className={styles.hrText}>Địa chỉ</div>
                            <div className={styles.hrBtop}></div>

                        </div>

                        <div className={styles.GrAddress}>
                            <div className={styles.tinhthanh}>

                                <Form.Group>
                                    <Form.Label className={styles.label}>Tỉnh, thành phố <span className={styles.ic}>*</span> </Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => handleTinhthanh(e.target.value)} >
                                        <option value="#" disabled selected hidden>chọn tỉnh thành</option>
                                        {quanhuyen && quanhuyen !== undefined ?
                                            tinhthanh.map((tt, index) => {
                                                return (
                                                    <option key={index} value={tt.TT_Ma + "_" + tt.TT_Ten}>{tt.TT_Ten}</option>
                                                )

                                            })

                                            : "Không tìm thấy"
                                        }



                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className={styles.quanhuyen}>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Quận, huyện <span className={styles.ic}>*</span> </Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => handleQuanhuyen(e.target.value)} >
                                        <option value="#" disabled selected hidden>chọn quận huyện</option>
                                        {quanhuyen && quanhuyen !== undefined ?
                                            quanhuyen.map((qh, index) => {
                                                return (
                                                    <option key={index} value={qh.QH_Ma + "_" + qh.QH_Ten}>{qh.QH_Ten}</option>
                                                )

                                            })

                                            : "Không tìm thấy"
                                        }



                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>


                        <div className={styles.GrAddress}>
                            <div className={styles.tinhthanh}>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Phường, xã <span className={styles.ic}>*</span> </Form.Label>
                                    <Form.Select aria-label="Default select example" name="XaPhuongXPMa" onChange={handleChange}>
                                        <option value="#" disabled selected hidden>chọn phường, xã</option>
                                        {xaphuong && xaphuong !== undefined ?
                                            xaphuong.map((tt, index) => {
                                                return (
                                                    <option key={index} value={tt.XP_Ma + "_" +tt.XP_Ten}>{tt.XP_Ten}</option>
                                                )

                                            })

                                            : "Không tìm thấy"
                                        }



                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className={styles.quanhuyen}>
                                <Form.Group>
                                    <Form.Label className={styles.label}>Địa chỉ cụ thể <span className={styles.ic}>*</span> </Form.Label>
                                    <FormControl placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ..." name="BDS_DiaChiCuThe"
                                        value={formValues.BDS_DiaChiCuThe} onChange={handleChange} />
                                </Form.Group>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Thông tin bài viết */}
                <div className={styles.padConent}>
                    <div className={styles.content}>
                        <div className={styles.form}>
                            <h4>Thông tin bài viết</h4><br />

                            <Form.Group>
                                <Form.Label className={styles.label}>Tiêu đề <span className={styles.ic}>*</span> </Form.Label>
                                <FormControl placeholder="VD: Bán nhà riêng 50m2 chính chủ tại Cầu Giấy" name="BDS_Ten"
                                    value={formValues.BDS_Ten} onChange={handleChange} />
                            </Form.Group>

                            <div >
                                <Form.Label className={styles.label}>Mô tả <span className={styles.ic}>*</span> </Form.Label>
                            <div >
                                <CKEditor
                                editor={ ClassicEditor }
                                onChange={handleChangeMota}
                                />
                             </div>
                            </div>
                            {/* <Form.Group>
                                <Form.Label className={styles.label}>Mô tả<span className={styles.ic}>*</span> </Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học..."
                                    name="BDS_MoTaChiTiet" value={formValues.BDS_MoTaChiTiet} onChange={handleChange} />
                            </Form.Group> */}
                        </div>
                    </div>
                </div>

                {/* Thông tin bất động sản */}
                <div className={styles.padConent}>
                    <div className={styles.content}>
                        <div className={styles.form}>
                            <h4>Thông tin bất động sản</h4><br />
                            <Form.Group>
                                <Form.Label className={styles.label}>Diện tích <span className={styles.ic}>*</span> </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl placeholder="Nhập diện tích" name="BDS_DienTich" value={formValues.BDS_DienTich} onChange={handleChange} />
                                    <InputGroup.Text>m²</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>


                            <div className={styles.GrAddress}>
                                <div className={styles.boxGia}>
                                    <Form.Group>
                                        <Form.Label className={styles.label}>Mức giá <span className={styles.ic}>*</span> </Form.Label>
                                        <FormControl placeholder="Nhập giá, VD: 120000000" name="BDS_Gia" value={formValues.BDS_Gia} onChange={handleChange} />
                                    </Form.Group>
                                </div>
                                <div className={styles.boxTt}>
                                    <Form.Group>
                                        <Form.Label className={styles.label}>Loại tiền tệ <span className={styles.ic}>*</span> </Form.Label>
                                        <Form.Select aria-label="Default select example" name="LoaiTienTeLTTMa" onChange={handleChange}>
                                        <option value="#">chọn loại tiền tệ</option>

                                            {
                                                tiente.map((data, index) => {
                                                    return (
                                                        <option key={index} value={data.LTT_Ma}>{data.LTT_Ten}</option>
                                                    )
                                                })
                                            }

                                        </Form.Select>
                                    </Form.Group>
                                </div>

                            </div>
                            <p>{PriceFormat(formValues.BDS_Gia)}</p>

                            {/* pháp lý */}
                            <Form.Group>
                                <Form.Label className={styles.label}>Giấy tờ pháp lý </Form.Label>
                                <FormControl placeholder="VD: Sổ đỏ, sổ hồng,..." name="PL_Ten"
                                    value={formValues.PL_Ten} onChange={handleChange} />
                            </Form.Group>

                            <div className={styles.hr}>
                                <div className={styles.hrText}>Thông tin chi tiết</div>
                                <div className={styles.hrBtop}></div>

                            </div>
                            <div className={styles.GrAddress}>
                                <div className={styles.boxchitiet}>
                                    Số phòng ngủ:
                                </div>
                                <div className={styles.boxQuantity}>
                                    <Form.Group>
                                        <InputGroup className="mb-3">
                                            <Button variant="secondary " onClick={handleDecrement} >-</Button>
                                            <FormControl className="text-center" name="BDS_SoPhongNgu" value={formValues.BDS_SoPhongNgu = quantity} onChange={handleChange} />
                                            <Button variant="secondary" onClick={handleIncrement}>+</Button>
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                            </div>

                            <div className={styles.GrAddress}>
                                <div className={styles.boxchitiet} >
                                    Số phong tam:
                                </div>
                                <div className={styles.boxQuantity}>
                                    <Form.Group>
                                        <InputGroup className="mb-3">
                                            <Button variant="secondary " onClick={handleDecrementBr}>-</Button>
                                            <FormControl className="text-center" name="BDS_SoPhongTam" value={formValues.BDS_SoPhongTam = quantityBr} onChange={handleChange} />
                                            <Button variant="secondary" onClick={handleIncrementBr}>+</Button>
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>

                {/* hình ảnh bất động sản */}
                <div className={styles.padConent}>
                    <div className={styles.content}>
                        <div className={styles.form}>
                        <h4>Hình ảnh</h4>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Hình</Form.Label>
                                <Form.Control type="file" name = "HA_DuongDan" multiple
                                onChange={(e) => setImg(e.target.files)} />
                            </Form.Group>
                            
                        </div>
                    </div>
                </div>

                {/* thông tin liên hệ chủ sở hữu bất động sản */}
                <div className={styles.padConent}>
                    <div className={styles.content}>
                        <div className={styles.form}>
                            <h4>Thông tin chủ sở hữu</h4>
                            {/* <div className={styles.btnAdd}><HandellAddLh /></div> */}
                            <Form.Group>
                                <Form.Label className={styles.label}>Chủ sở hữu đã hợp tác </Form.Label>
                                <Form.Select aria-label="Default select example" name="LienHeLHMa"
                                    onChange={handleChange}>
                                    {/* onChange={(e) => handleLienhe(e.target.value)} */}
                                    <option value="#" disabled selected hidden>Những chủ sở hữu đã hợp tác</option>
                                    {
                                        lienhe.map((data, index) => {
                                            return (
                                                <option key={index} value={data.LH_Ma}>{data.LH_TenChuSoHuu}</option>
                                            )
                                        })
                                    }

                                </Form.Select>
                            </Form.Group>
                                    <br />
                            <Button
                                onClick={() => setOpenAddress(!openAddress)}
                                aria-controls="example-collapse-text"
                                aria-expanded={openAddress} variant="success">
                                    Thêm thông tin chủ sở hữu mới
                                </Button>
                            <br />
                                     <Collapse in={openAddress}>
                                         <div >
                                                    <div className={styles.GrAddress}>
                                                        <div className={styles.tinhthanh}>
                                                        {/* name="BDS_Gia" value={formValues.BDS_Gia} onChange={handleChange */}
                                                            <Form.Group>
                                                                <Form.Label className={styles.label}>Tên chủ sở hữu<span className={styles.ic}>*</span> </Form.Label>
                                                                <FormControl placeholder="Tên liên hệ" name="LH_TenChuSoHuu" value={formValues.LH_TenChuSoHuu} onChange={handleChange} />
                                                            </Form.Group>
                                                        </div>
                                                        <div className={styles.quanhuyen}>
                                                            <Form.Group>
                                                                <Form.Label className={styles.label}>Số điện thoại<span className={styles.ic}>*</span> </Form.Label>
                                                                <FormControl placeholder="Số điện thoại" name="LH_SoDienThoai" value={formValues.LH_SoDienThoai} onChange={handleChange} />
                                                            </Form.Group>
                                                        </div>
                                                    </div>

                                                    <div className={styles.GrAddress}>
                                                        <div className={styles.tinhthanh}>

                                                            <Form.Group>
                                                                <Form.Label className={styles.label}>Email<span className={styles.ic}>*</span> </Form.Label>
                                                                <FormControl placeholder="Email" name="LH_Email" value={formValues.LH_Email}  onChange={handleChange} />
                                                            </Form.Group>
                                                        </div>
                                                        <div className={styles.quanhuyen}>
                                                            <Form.Group>
                                                                <Form.Label className={styles.label}>Địa chỉ<span className={styles.ic}>*</span> </Form.Label>
                                                                <FormControl placeholder="Địa chỉ" name="LH_DiaChi" value={formValues.LH_DiaChi} onChange={handleChange} />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                        </div>
                                        </Collapse>
                                    
                            
                            <br />
                            <Button onClick={handleSubmit} variant="primary" className="w-25 " type="submit">
                                Submit
                            </Button>
                        </div>

                    </div>
                </div>
            </Form>




        </div>
    )

}

export default AddTinBDS;
